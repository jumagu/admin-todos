import { getServerSession } from "next-auth";

import { authOptions } from "@/auth.config";

import { Aside } from "./Aside";

export const SideBar = async () => {
  const session = await getServerSession(authOptions);

  const userImage =
    session?.user?.image ??
    "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png";
  const userName = session?.user?.name ?? "John Doe";
  const userRoles = session?.user?.roles ?? ["Client"];

  return (
    <Aside
      userName={userName}
      userImage={userImage}
      userRoles={userRoles}
    ></Aside>
  );
};
