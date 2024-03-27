"use client";
import Image from "next/image";
import Link from "next/link";
import { menus } from "@/utils/MockData";
import UserAuth from "../custom/UserAuth";
import { usePathname } from "next/navigation";
import UserProfile from "../custom/UserProfile";
import { USER_DATA } from "@/config/config";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const TopNavBar = () => {
  const pathname = usePathname();
  const hidden = pathname === "/signin" || pathname === "/signup";

  const userString =
    typeof window !== "undefined" ? localStorage.getItem(USER_DATA) : null;
  const user = userString ? JSON.parse(userString) : null;

  return (
    <>
      {!hidden && (
        <div className="w-full h-fit flex justify-between items-center px-5 py-3 absolute top-0 left-0 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
          <Link prefetch={false} href="/">
            <Image src="/dokta-logo.png" width={100} height={100} alt="Logo" />
          </Link>

          <div className="w-fit h-fit justify-between items-center gap-20 hidden md:flex lg:flex">
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

          <div className="w-fit flex items-center gap-3">
            {user ? <UserProfile /> : <UserAuth />}
            <div className="flex md:hidden lg:hidden">
              <HiOutlineMenuAlt3
                className={`text-3xl cursor-pointer ${
                  pathname === "/" ? "text-white" : "text-black"
                }`}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default TopNavBar;
