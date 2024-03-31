"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePaystackPayment } from "react-paystack";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import Image from "next/image";
import { postRequest } from "@/utils/apiRequest";
import { USER_DATA } from "@/config/config";
import { setToken } from "@/utils/axiosInstance";
import { toast } from "@/components/ui/use-toast";
import { BiLoaderAlt } from "react-icons/bi";
import { HiInformationCircle } from "react-icons/hi";

interface IPayment {
  amount: number;
  type: string;
}

interface PropTypes {
  handleTopUp: () => void;
}
const CTAButton = (props: PropTypes) => {
  const { handleTopUp } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");

  const userString =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const user = userString ? JSON.parse(userString) : null;

  /********* PayStack Config *********/

  const configPayStack = {
    // reference: new Date().getTime().toString(),
    reference: "ly4wv0tzji",
    email: "string@gmail.com",
    amount: parseInt(amount),
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY as string,
  };

  const onSuccess = (reference: any) => {
    makePayment(reference);
  };

  const makePayment = async (reference: any) => {
    //console.log("makePayment", reference);
    try {
      setToken();
      const paymentData = {
        amount: parseInt(amount),
        reference: reference.reference,
        transaction: reference.transaction,
        status: reference.status,
        message: reference.message,
        transfer_type: "topup",
        payment_processor: "paystack",
        percentage_fee: 200.256,
        percentage_charge: 0.2,
        percentage: 1.5,
        total: 1.5,
      };

      //setIsLoading(true);
      const response: any = await postRequest(
        "transfer/wallet/topup",
        paymentData
      );
      if (response && response?.success === true) {
        toast({
          variant: "copied",
          description: (
            <div className="w-full flex justify-center items-center">
              {response.message}
            </div>
          ),
        });
        props.handleTopUp();
        setIsLoading(false);
      } else {
        toast({
          variant: "copied",
          description: (
            <div className="w-full flex justify-center items-center">
              {response.message}
            </div>
          ),
        });
        setIsLoading(false);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: (
          <div className="w-full flex justify-center items-center">
            {error.message}
          </div>
        ),
      });
      console.log("error", error);
      setIsLoading(false);
    }
  };
  const onClose = () => {
    toast({
      variant: "destructive",
      description: (
        <div className="w-full flex justify-center items-center">
          Payment is not successfull
        </div>
      ),
    });
    console.log("Payment is not successfull");
    console.log("closed");
  };

  //const walletBalance = props.walletBalance;

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (!/^\d*\.?\d*$/.test(value)) {
      setAmount("");
      return;
    }
    setAmount(value);
    //console.log(amount);
  };

  async function handleLoginUser(data: IPayment) {
    try {
      await setToken();

      let userData: any = localStorage.getItem(USER_DATA);
      userData = userData ? JSON.parse(userData) : null;
      //console.log("userData", userData?.email);
      setIsLoading(true);
      const response: any = await postRequest("transfer/payment/link", {
        amount: parseInt(amount),
        type: "paystack",
      });
      if (response && response?.success === true) {
        //console.log("Payment respnse", response.data);
        configPayStack.amount = response.data.amount;
        configPayStack.email = response.data.email;
        configPayStack.reference = response.data.reference;
        handlePaystackPayment({ onSuccess, onClose });
        // //alert(response.message);
        // setIsLoading(false);
        // router.push("/wallet");
      } else {
        alert(response.message);
        // setIsLoading(false);
      }
    } catch (error: any) {
      alert(error.message);
      console.log("handlePaystackPayment", error);
      // setIsLoading(false);
    }
  }

  const handlePaystackPayment = usePaystackPayment(configPayStack);

  /********* Flutterwave Config *********/

  const configFlutter = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_KEY as string,
    tx_ref: new Date().getTime().toString(),
    amount: 6000,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "jibola422@gmail.com",
      phone_number: "08079342557",
      name: "Ajibola Dada",
    },
    customizations: {
      title: "my Payment Title",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(configFlutter);

  const resetAmountInput = () => {
    setAmount("");
  };

  {
    isLoading &&
      toast({
        title: "Syncing ...",
        variant: "copied",
        description: (
          <div className="w-full mt-3 flex justify-center items-center">
            {" "}
            <BiLoaderAlt className="mr-2 h-4 w-4 animate-spin" />{" "}
          </div>
        ),
      });
  }

  return (
    <div className="w-full flex items-center gap-5">
      <Dialog>
        <DialogTrigger>
          {" "}
          <Button
            variant="default"
            size="sm"
            className="bg-white text-[#2A3780] hover:bg-gray-200"
          >
            {" "}
            Topup Wallet{" "}
          </Button>{" "}
        </DialogTrigger>
        <DialogContent className="w-full flex flex-col items-center justify-center gap-5">
          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex items-center mt-5">
              <Button
                variant="default"
                size="sm"
                className="w-1/5 rounded-l-lg rounded-r-none bg-[#2A3780] text-white"
              >
                &#8358;
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-2 border-[#2A3780] rounded-l-none w-full"
              >
                <input
                  type="text"
                  placeholder="Input Amount"
                  className="rounded-r-lg w-full outline-0 text-gray-500 bg-transparent"
                  inputMode="numeric"
                  value={amount}
                  onChange={handleAmountChange}
                  required
                />
              </Button>
            </div>
            <div className="w-full flex items-center gap-2">
              <HiInformationCircle className="text-base text-[#2A3780]" />
              <p className="text-[9px] md:text-xs lg:text-xs text-gray-500 justify-start">
                Kindly note that amount lower than{" "}
                <span className="font-bold"> &#8358;1,000 </span> won&apos;t be
                processed
              </p>
            </div>
          </div>
          <div className="w-full">
            <Dialog>
              <DialogTrigger asChild className="w-full">
                <Button
                  variant="default"
                  size="sm"
                  type="button"
                  className="w-full text-white bg-[#2A3780] hover:border-none"
                  disabled={amount === "" || parseInt(amount) < 1000}
                >
                  {" "}
                  Next{" "}
                </Button>
              </DialogTrigger>
              <DialogContent className="flex flex-col items-center justify-center gap-5">
                <h2 className="text-center font-bold text-xl"> Pay with:</h2>

                <div className="w-full flex items-center justify-center gap-5">
                  <DialogClose className="w-auto">
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-[#2A3780] text-white border-2 border-white hover:bg-gray-200 flex items-center gap-2 py-3"
                      onClick={() => {
                        handleLoginUser({
                          amount: parseInt(amount),
                          type: "paystack",
                        });
                        resetAmountInput();
                        // handlePaystackPayment({ onSuccess, onClose });
                      }}
                    >
                      <Image
                        src="/payStack.png"
                        width={20}
                        height={20}
                        alt="PayStack logo"
                      />
                      PayStack
                    </Button>
                  </DialogClose>

                  <DialogClose className="w-auto">
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-[#2A3780] text-white border-2 border-white hover:bg-gray-200 flex items-center gap-2 py-3"
                      onClick={() => {
                        handleFlutterPayment({
                          callback: (response) => {
                            closePaymentModal();
                            console.log(response);
                          },
                          onClose: () => {
                            closePaymentModal();
                          },
                        });
                      }}
                    >
                      <Image
                        src="/flutterWave.png"
                        width={30}
                        height={30}
                        alt="Flutter logo"
                      />
                      Flutter Wave
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </DialogContent>
      </Dialog>
      <Button
        variant="outline"
        size="sm"
        className="border border-white bg-transparent text-white hover:bg-gray-200"
      >
        {" "}
        Transfer{" "}
      </Button>
    </div>
  );
};
export default CTAButton;
