import { useContext, createContext, useState, useEffect, useCallback } from "react";
import { auth, githubProvider } from "../lib/firebase";
import { signInWithPopup, onAuthStateChanged, signOut, GithubAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";

const AuthContext = createContext();

// Map Firebase error codes to user-friendly messages
function getErrorMessage(error) {
  const errorCode = error?.code || '';
  switch (errorCode) {
    case 'auth/popup-closed-by-user':
      return 'Sign-in was cancelled. Please try again.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized for sign-in.';
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with this email using a different sign-in method.';
    default:
      return 'An error occurred. Please try again.';
  }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [arcanextUser, setArcanextUser] = useState(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [githubAccessToken, setGithubAccessToken] = useState(null);

  // Clear error function
  const clearError = useCallback(() => {
    setAuthError(null);
  }, []);

  // Set Firebase persistence to LOCAL on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Ensure Firebase persists auth state in localStorage
        await setPersistence(auth, browserLocalPersistence);
      } catch (error) {
        console.error('Failed to set auth persistence:', error);
      }
    };
    initAuth();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user) {
        try {
          const token = await user.getIdToken();
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
          const response = await fetch(`${apiUrl}/api/v1/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            setArcanextUser(data);
          } else {
            console.error('Failed to fetch Arcanext user:', response.status, await response.text());
          }
        } catch (error) {
          console.warn('Backend API not available:', error.message);
          // Continue without backend - user can still use OAuth features
        }
      } else {
        setArcanextUser(null);
        setGithubAccessToken(null);
      }
    });
    return unsubscribe;
  }, []);


  // GitHub sign-in with loading state and error handling
  // Captures the GitHub access token for repo operations
  const signinWithGitHub = useCallback(async () => {
    setIsSigningIn(true);
    setAuthError(null);
    try {
      // Ensure persistence is set before sign-in
      await setPersistence(auth, browserLocalPersistence);
      
      const result = await signInWithPopup(auth, githubProvider);
      
      // Get the GitHub OAuth access token for repo operations
      const credential = GithubAuthProvider.credentialFromResult(result);
      if (credential) {
        const token = credential.accessToken;
        setGithubAccessToken(token);
        // Store in localStorage for persistence
        if (typeof window !== 'undefined') {
          localStorage.setItem('github_access_token', token);
        }
      }
      
      return result;
    } catch (error) {
      const message = getErrorMessage(error);
      setAuthError(message);
      throw error;
    } finally {
      setIsSigningIn(false);
    }
  }, []);

  // Enhanced signout that clears all user state
  const signout = useCallback(async () => {
    try {
      await signOut(auth);
      // Clear all user state
      setCurrentUser(null);
      setArcanextUser(null);
      setAuthError(null);
      setGithubAccessToken(null);
      // Clear stored tokens
      if (typeof window !== 'undefined') {
        localStorage.removeItem('github_access_token');
      }
    } catch (error) {
      console.error('Error during sign out:', error);
      throw error;
    }
  }, []);

  // Load GitHub token from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('github_access_token');
      if (storedToken) {
        setGithubAccessToken(storedToken);
      }
    }
  }, []);

  const value = {
    currentUser,
    loading,
    signinWithGitHub,
    signout,
    arcanextUser,
    isSigningIn,
    authError,
    clearError,
    githubAccessToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
