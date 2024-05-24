"use client";

import { useContext } from "react";

import { CiMenuBurger } from "react-icons/ci";

import { UiContext } from "../providers/UiProvider";

export const ToggleMenuButton = () => {
  const { setIsSidebarOpen } = useContext(UiContext);

  return (
    <button
      className="w-12 h-16 -mr-2 border-r md:hidden"
      onClick={() => setIsSidebarOpen((state: boolean) => !state)}
    >
      <CiMenuBurger size={30} />
    </button>
  );
};
