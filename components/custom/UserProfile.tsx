import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import CTAButton from "@/components/wallet/CTAButton";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

const UserProfile = () => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Image
          src="/patient.jpeg"
          width={40}
          height={40}
          alt="Patient"
          className="rounded-full border-2 border-[#2A3780]"
        />
      </DialogTrigger>
      <DialogContent className="max-w-[30%] left-[83%] top-[20%] translate-x-[-50%] translate-y-[-50%] bg-[#2A3780] border-none">
        <DialogHeader>
          <DialogDescription>
            <div className="flex items-center gap-3 mb-7">
              <span className="text-base text-gray-500"> Wallet Balance: </span>
              <span className="text-3xl font-semibold text-white">
                {" "}
                N20,000{" "}
              </span>
            </div>
            <CTAButton />
            <DialogClose className="w-full">
              <Button
                variant="default"
                size="sm"
                className="w-full py-3 bg-transparent mt-10"
                onClick={handleLogout}
              >
                {" "}
                Log Out{" "}
              </Button>
            </DialogClose>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;
