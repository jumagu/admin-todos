"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  title: string;
  path: string;
  icon: React.ReactNode;
  closeSideMenu: () => {};
}

export const SideBarItem = ({ title, path, icon, closeSideMenu }: Props) => {
  const pathName = usePathname();

  return (
    <li onClick={closeSideMenu}>
      <Link
        href={path}
        className={`px-4 py-3 flex items-center space-x-4 rounded-xl text-gray-600 ${
          path === pathName
            ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400 group-unse"
            : "group"
        }`}
      >
        <div
          className={`text-gray-600 group-hover:text-cyan-400 transition-all ${
            path === pathName ? "text-white" : ""
          }`}
        >
          {icon}
        </div>
        <span
          className={`group-hover:text-gray-700 group-hover:font-medium transition-all ${
            path === pathName ? "-mr-1 font-medium" : ""
          }`}
        >
          {title}
        </span>
      </Link>
    </li>
  );
};
