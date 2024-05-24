import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import { authOptions } from "@/auth.config";

import { WidgetItem } from "@/components";

export const metadata = {
  title: "Dashboard",
  description: "Labore Lorem occaecat anim anim sit Lorem sit pariatur.",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="grid mx-auto w-full max-w-5xl">
      <WidgetItem title="My Profile - Server">
        <div className="flex flex-col">
          <span>
            <b>Id: </b>
            {session.user?.id}
          </span>
          <span>
            <b>Name: </b>
            {session.user?.name}
          </span>
          <span>
            <b>Email address: </b>
            {session.user?.email}
          </span>
          <span>
            <b>Roles: </b>
            {session.user?.roles?.join(", ")}
          </span>
          <span>
            <b>Profile image: </b>
            {session.user?.image}
          </span>
        </div>
      </WidgetItem>
    </div>
  );
}
