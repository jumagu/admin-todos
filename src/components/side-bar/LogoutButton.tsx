"use client";

import { useSession, signIn, signOut } from "next-auth/react";

import { CiLogin, CiLogout } from "react-icons/ci";

export const LogoutButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      <div className="px-4 py-3 flex items-center space-x-2 text-gray-600 group">
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span>Loading...</span>
      </div>
    );

  if (status === "unauthenticated")
    return (
      <button
        className="px-4 py-3 flex items-center space-x-2 text-gray-600 group"
        onClick={() => signIn()}
      >
        <CiLogin className="group-hover:text-cyan-400" size={20} />
        <span className="group-hover:text-gray-700 group-hover:font-medium">
          Login
        </span>
      </button>
    );

  return (
    <button
      className="px-4 py-3 flex items-center space-x-2 text-gray-600 group"
      onClick={() => signOut()}
    >
      <CiLogout
        className="group-hover:text-cyan-400 transition-all"
        size={20}
      />
      <span className="group-hover:text-gray-700 group-hover:font-medium transition-all duration-300">
        Logout
      </span>
    </button>
  );
};
