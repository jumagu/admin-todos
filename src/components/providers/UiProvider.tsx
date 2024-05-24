"use client";

import { createContext, useState } from "react";

export const UiContext = createContext({});

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
