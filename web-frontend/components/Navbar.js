import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser, loading, signinWithGitHub, signout } = useAuth();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
      <div className="font-bold text-xl">Arcanext</div>
      <div>
        {loading ? (
          <span>Loading...</span>
        ) : currentUser ? (
          <div className="flex items-center gap-4">
            <span>{currentUser.email}</span>
            <button
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              onClick={signout}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
            onClick={signinWithGitHub}
          >
            Sign in with GitHub
          </button>
        )}
      </div>
    </nav>
  );
}
