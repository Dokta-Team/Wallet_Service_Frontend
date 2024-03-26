"use client";
import Image from "next/image";
import Link from "next/link";
import { menus } from "@/utils/MockData";
import UserAuth from "../custom/UserAuth";
import { usePathname } from "next/navigation";
import UserProfile from "../custom/UserProfile";

const TopNavBar = () => {
  const pathname = usePathname();
  const hidden = pathname === "/signin" || pathname === "/signup";

  const userString =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const user = userString ? JSON.parse(userString) : null;

  return (
    <>
      {!hidden && (
        <div className="w-full h-fit flex justify-between items-center px-5 py-3 absolute top-0 left-0 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
          <Link prefetch={false} href="/">
            <Image src="/dokta-logo.png" width={100} height={100} alt="Logo" />
          </Link>

          <div className="w-fit h-fit flex justify-between items-center gap-20">
            {menus.map((menu, key) => (
              <Link prefetch={false} href={menu?.link} key={key}>
                <ul className="flex items-center">
                  <li>
                    <p
                      className={`text-base font-medium ${
                        pathname !== "/" ? "text-[#2A3780]" : "text-white"
                      }`}
                    >
                      {" "}
                      {menu?.name}{" "}
                    </p>
                  </li>
                </ul>
              </Link>
            ))}
          </div>

          {user ? <UserProfile /> : <UserAuth />}
        </div>
      )}
    </>
  );
};
export default TopNavBar;
