import { useContext, createContext, useState, useEffect, useCallback } from "react";
import { auth, githubProvider } from "../lib/firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

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

  // Clear error function
  const clearError = useCallback(() => {
    setAuthError(null);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user) {
        try {
          const token = await user.getIdToken();
          const response = await fetch("http://127.0.0.1:8000/api/v1/auth/me", {
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
          console.error('Error during backend handshake:', error);
        }
      } else {
        setArcanextUser(null);
      }
    });
    return unsubscribe;
  }, []);

  // Enhanced signinWithGitHub with loading state and error handling
  const signinWithGitHub = useCallback(async () => {
    setIsSigningIn(true);
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, githubProvider);
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
    } catch (error) {
      console.error('Error during sign out:', error);
      throw error;
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
    clearError
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
