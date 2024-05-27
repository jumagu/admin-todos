"use client";

import { createContext, useEffect, useState } from "react";

interface UiContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UiContext = createContext<UiContextType>({
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
});

export default function UiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  return (
    <UiContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </UiContext.Provider>
  );
}
