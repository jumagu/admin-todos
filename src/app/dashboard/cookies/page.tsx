import { cookies } from "next/headers";

import { TabBar } from "@/components";

export const metadata = {
  title: "Cookies",
  description: "Sit ut esse fugiat cupidatat nulla labore qui ea velit ",
};

export default function CookiesPage() {
  const cookieStore = cookies();
  const tab = cookieStore.get("selected-tab")?.value ?? "1";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 bg-white p-4 rounded-xl">
      <div className="flex flex-col">
        <span className="text-3xl mb-2">Tabs</span>
        <TabBar currentTab={Number(tab)} />
      </div>
    </div>
  );
}
