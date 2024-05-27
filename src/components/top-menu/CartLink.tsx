"use client";

import { useContext } from "react";

import Link from "next/link";

import { CiShoppingBasket } from "react-icons/ci";

import { UiContext } from "../providers/UiProvider";

interface Props {
  totalCount: number;
}

export const CartLink = ({ totalCount }: Props) => {
  const { setIsSidebarOpen } = useContext(UiContext);

  return (
    <Link
      href="/dashboard/cart"
      className="flex items-center justify-center w-14 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200"
      onClick={() => setIsSidebarOpen(false)}
    >
      <CiShoppingBasket
        className="relative bottom-[3px] right-[-1px]"
        size={25}
      />
      <span className="relative bottom-[-7px] right-[1px] text-xs font-medium">
        {totalCount}
      </span>
    </Link>
  );
};
