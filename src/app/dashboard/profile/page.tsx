"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  // ? Esta es la forma de usar la data de sesión del lado del cliente
  const { data: session } = useSession();

  return (
    <div className="break-all">
      <h1 className="text-xl font-medium mb-2">My Profile - Client</h1>

      <div className="flex flex-col">
        <span>
          <b>Id: </b>
          {session?.user?.id ?? ""}
        </span>
        <span>
          <b>Name: </b>
          {session?.user?.name ?? ""}
        </span>
        <span>
          <b>Email address: </b>
          {session?.user?.email ?? ""}
        </span>
        <span>
          <b>Roles: </b>
          {session?.user?.roles?.join(", ") ?? ""}
        </span>
        <span>
          <b>Profile image: </b>
          {session?.user?.image ?? ""}
        </span>
      </div>
    </div>
  );
}
