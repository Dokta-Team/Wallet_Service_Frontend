"use client";
import React, { useState, useEffect } from "react";
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
import { TOKEN_NAME, USER_DATA } from "@/config/config";
import { removeCookie } from "@/utils/cookieData";
import { useRouter } from "next/navigation";
import { getUserWallet } from "@/utils/getWalletData";
import { Skeleton } from "@/components/ui/skeleton";

const UserProfile = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem(USER_DATA);
    removeCookie(TOKEN_NAME);
    window.location.reload();
    router.push("/signin");
  };
  const [wallet_balance, setwallet_balance] = useState(0.0);

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const balance = await getUserWallet();
        setwallet_balance(balance);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWalletBalance();
  }, []);

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
                &#8358;
                {wallet_balance === undefined || wallet_balance === null ? (
                  <Skeleton className="h-10 w-40 bg-[#010413] rounded-lg shadow ml-3" />
                ) : (
                  <>{wallet_balance?.toLocaleString()}</>
                )}
              </span>
            </div>
            <DialogClose className="w-full">
              <Button
                variant="default"
                size="sm"
                className="w-full py-3 bg-white mt-10 text-[2A3780] hover:text-white"
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
