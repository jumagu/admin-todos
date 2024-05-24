"use client";

import { createContext, useState } from "react";

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

  return (
    <UiContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </UiContext.Provider>
  );
}
