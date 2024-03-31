"use client";
import React, { useEffect, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { table } from "@/utils/MockData";
import CTAButton from "@/components/wallet/CTAButton";
import Link from "next/link";
import { USER_DATA } from "@/config/config";
import { getUserWallet } from "@/utils/getWalletData";
import { Skeleton } from "@/components/ui/skeleton";

const Wallet = () => {
  const [wallet_balance, setwallet_balance] = useState<number>(0.0);

  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const userString = localStorage.getItem(USER_DATA);
      return userString ? JSON.parse(userString) : null;
    }
    return null;
  });

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  const fetchWalletBalance = async () => {
    try {
      const balance = await getUserWallet();
      setwallet_balance(balance);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTopUp = async () => {
    try {
      await fetchWalletBalance();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!user && (
        <div className="flex items-center justify-center fixed left-0 top-0 z-30 w-full max-w-full h-full max-h-full bg-black rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10">
          <p className="text-center text-lg">
            {" "}
            <Link prefetch={false} href="/signin">
              <span className="text-[#2A3780] underline text-2xl">Sign in</span>
            </Link>{" "}
            <br />
            You need to be logged in to use this page.
          </p>
        </div>
      )}
      <div className="w-full h-[100vh] overflow-y-auto md:overflow-y-hidden lg:overflow-y-hidden pt-28 pl-5 md:pl-10 lg:pl-10 pr-5 md:pr-0 lg:pr-0">
        <div className="flex items-center gap-2 mb-20">
          <h2 className="text-2xl md:text-4xl lg:text-4xl font-semibold text-[#2A3780] uppercase">
            {" "}
            My Wallet{" "}
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HiInformationCircle
                  className="text-base text-[#2A3780] hidden
            md:block lg:block"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">
                  {" "}
                  You can check both your wallet balance and transactions here{" "}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="w-full md:w-[40%] lg:w-[40%] h-auto p-10 bg-[#2A3780] drop-shadow-lg mb-10 rounded-xl">
          <h2 className="text-4xl font-bold flex items-center mb-10 text-white">
            {" "}
            &#8358;
            {wallet_balance === undefined || wallet_balance === null ? (
              <Skeleton className="h-10 w-40 bg-[#010413] rounded-lg shadow ml-3" />
            ) : (
              <>{wallet_balance?.toLocaleString()}</>
            )}
          </h2>
          <CTAButton handleTopUp={handleTopUp} />
        </div>
        <div className="w-full h-auto md:h-56 lg:h-56 md:overflow-y-auto lg:overflow-y-auto overflow-x-auto md:overflow-x-hidden lg:overflow-x-hidden">
          <table className="w-full h-full">
            <thead className="w-full">
              <tr className="w-full">
                <td className="text-base text-[#2A3780] font-semibold p-3">
                  ID
                </td>
                <td className="text-base text-[#2A3780] font-semibold p-3">
                  Date
                </td>
                <td className="text-base text-[#2A3780] font-semibold p-3">
                  Reference Number
                </td>
                <td className="text-base text-[#2A3780] font-semibold p-3">
                  Product Name
                </td>
              </tr>
            </thead>
            <tbody>
              {table.map((data) => (
                <tr
                  key={data?.id}
                  className={
                    data?.id % 2 === 0
                      ? "bg-[#2A3780] text-white"
                      : "bg-white text-[#2A3780]"
                  }
                >
                  <td className="p-3">#{data?.id}</td>
                  <td className="p-3">19-03-24</td>
                  <td className="p-3">LA205672TY90P</td>
                  <td className="p-3"> Vitamin C </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Wallet;
