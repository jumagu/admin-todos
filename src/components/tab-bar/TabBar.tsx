"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { setCookie } from "cookies-next";

interface Props {
  tabs?: number[];
  currentTab?: number;
}

export const TabBar = ({ tabs = [1, 2, 3, 4], currentTab = 1 }: Props) => {
  const router = useRouter();

  const [selected, setSelected] = useState(currentTab);

  const onTabSelect = (tab: number) => {
    setSelected(tab);
    setCookie("selected-tab", tab.toString());
    router.refresh();
  };

  return (
    <div className={`w-full grid grid-cols-4 rounded-xl bg-gray-200 p-2`}>
      {tabs.map((tab) => (
        <div key={tab}>
          <input
            type="radio"
            id={tab.toString()}
            className="peer hidden"
            checked={selected === tab}
            onChange={() => {}}
          />
          <label
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white transition-all"
            onClick={() => onTabSelect(tab)}
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};
