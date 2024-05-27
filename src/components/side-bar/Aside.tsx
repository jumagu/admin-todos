"use client";

import { useContext } from "react";

import Link from "next/link";
import Image from "next/image";

import {
  IoListOutline,
  IoPersonOutline,
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
} from "react-icons/io5";

import { SideBarItem } from "./SideBarItem";
import { LogoutButton } from "./LogoutButton";
import { UiContext } from "../providers/UiProvider";

interface Props {
  userName: string;
  userImage: string;
  userRoles: string[];
}

const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <IoCalendarOutline size={20} />,
  },
  {
    title: "Rest TODOS",
    path: "/dashboard/rest-todos",
    icon: <IoCheckboxOutline size={20} />,
  },
  {
    title: "Server Actions",
    path: "/dashboard/server-todos",
    icon: <IoListOutline size={20} />,
  },
  {
    title: "Cookies",
    path: "/dashboard/cookies",
    icon: <IoCodeWorkingOutline size={20} />,
  },
  {
    title: "Products",
    path: "/dashboard/products",
    icon: <IoBasketOutline size={20} />,
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: <IoPersonOutline size={20} />,
  },
];

export const Aside = ({ userName, userImage, userRoles }: Props) => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(UiContext);

  return (
    <aside
      className={`${
        isSidebarOpen ? "" : "ml-[-100%]"
      } md:ml-0 fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition-all duration-300 md:w-4/12 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] overflow-auto`}
    >
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard" title="home">
            <Image
              className="w-32"
              src="https://cdn.worldvectorlogo.com/logos/nextjs-13.svg"
              width={150}
              height={150}
              alt="Next.js Logo"
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            className="w-28 h-28 m-auto rounded-full object-cover"
            src={userImage}
            width={500}
            height={500}
            alt="User Image"
          />
          <h5 className="mt-4 text-xl font-semibold text-gray-600">
            {userName}
          </h5>
          <span className="text-gray-400 capitalize">
            {userRoles.join(" • ")}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide my-8">
          {menuItems.map((menuItem) => (
            <SideBarItem
              key={menuItem.path}
              {...menuItem}
              closeSideMenu={() => setIsSidebarOpen(false)}
            />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  );
};
