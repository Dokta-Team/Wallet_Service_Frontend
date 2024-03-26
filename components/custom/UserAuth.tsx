"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const UserAuth = () => {
  const pathname = usePathname();
  return (
    <div className="w-fit h-fit flex items-center gap-5">
      <Link prefetch={false} href="/signin">
        <Button
          variant="outline"
          size="sm"
          className={`border-[#2A3780] bg-transparent ${
            pathname !== "/" ? "text-[#2A3780]" : "text-white"
          }`}
        >
          Sign In
        </Button>
      </Link>
      <Link prefetch={false} href="/signup">
        <Button variant="default" size="sm" className="bg-[#2A3780] text-white">
          Sign Up
        </Button>
      </Link>
    </div>
  );
};
export default UserAuth;
