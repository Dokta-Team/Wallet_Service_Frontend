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
import { TOKEN_NAME, USER_DATA } from "@/config/config";
import { getRequest } from "@/utils/apiRequest";
import { getCookie } from "@/utils/cookieData";
import { setToken } from "@/utils/axiosInstance";

const Wallet = () => {
  const [wallet_balance, setwallet_balance] = useState(0.0);
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const userString = localStorage.getItem(USER_DATA);
      return userString ? JSON.parse(userString) : null;
    }
    return null;
  });

  useEffect(() => {
    getUserWallet();
  }, []);
  async function getUserWallet() {
    try {
      const token = await getCookie(TOKEN_NAME);
      console.log("hdfdf", token);
      await setToken(token);
      const response: any = await getRequest("wallet");
      if (response && response?.success === true) {
        // set your wallet
        setwallet_balance(response?.data?.wallet?.balance);
      } else {
        alert(response?.message || "Something went wrong");
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

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
      <div className="w-full h-[100vh] overflow-hidden pt-28 pl-10">
        <div className="flex items-center gap-2 mb-20">
          <h2 className="text-4xl font-semibold text-[#2A3780] uppercase">
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
        <div className="w-[40%] h-auto p-10 bg-[#2A3780] drop-shadow-lg mb-10 rounded-xl">
          <h2 className="text-4xl font-bold block mb-10 text-white">
            {" "}
            N{wallet_balance?.toLocaleString()}
          </h2>
          <CTAButton />
        </div>
        <div className="w-full h-56 overflow-y-auto">
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
