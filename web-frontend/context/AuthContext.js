import React, { useContext, createContext, useState, useEffect } from "react";
import { User } from "firebase/auth";
import { auth, githubProvider } from "../lib/firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [arcanextUser, setArcanextUser] = useState(null);

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

  const signinWithGitHub = () => signInWithPopup(auth, githubProvider);
  const signout = () => signOut(auth);

  const value = { currentUser, loading, signinWithGitHub, signout, arcanextUser };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
