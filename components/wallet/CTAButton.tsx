"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePaystackPayment } from "react-paystack";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import Image from "next/image";
import { postRequest } from "@/utils/apiRequest";
import { USER_DATA } from "@/config/config";
import { useState } from "react";
import { setToken } from "@/utils/axiosInstance";

interface IPayment {
  amount: number;
  type: string;
}

interface PropTypes {
  getUserWallet: () => void;
}
const CTAButton = (props: PropTypes) => {
  const { getUserWallet } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setamount] = useState("2000");
  const userString =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const user = userString ? JSON.parse(userString) : null;

  /********* PayStack Config *********/

  const configPayStack = {
    // reference: new Date().getTime().toString(),
    reference: "ly4wv0tzji",
    email: "string@gmail.com",
    amount: 2000000,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY as string,
  };

  const onSuccess = (reference: any) => {
    makePayment(reference);
  };

  const makePayment = async (reference: any) => {
    console.log("makePayment", reference);
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

      setIsLoading(true);
      const response: any = await postRequest(
        "transfer/wallet/topup",
        paymentData
      );
      if (response && response?.success === true) {
        alert(response.message);
        getUserWallet();
        // console.log("Payment respnse", response.data);
        // configPayStack.amount = response.data.amount;
        // configPayStack.email = response.data.email;
        // configPayStack.reference = response.data.reference;
        // handlePaystackPayment({ onSuccess, onClose });
        // //alert(response.message);
        // toast({
        //   variant: "default",
        //   description: (
        //     <div className="w-full flex flex-col justify-center items-center gap-3">
        //       <p className="text-lg"> Welcome!!! </p>
        //       <ImSpinner2 className="text-[#18283f] animate-spin ml-2" />
        //     </div>
        //   ),
        // });
        // setIsLoading(false);
        // router.push("/wallet");
      } else {
        alert(response.message);
        //alert(response.message);
        // toast({
        //   variant: "destructive",
        //   description: (
        //     <div className="w-full flex flex-col">{response?.message}</div>
        //   ),
        // });
        // setIsLoading(false);
      }
    } catch (error: any) {
      alert(error.message);
      console.log("error", error);
      // toast({
      //   variant: "destructive",
      //   description: (
      //     <div className="w-full flex flex-col">{error?.message}</div>
      //   ),
      // });
      // setIsLoading(false);
    }
  };
  const onClose = () => {
    console.log("Payment is not successfull");
    console.log("closed");
  };

  const checkInputAmount = async () => {
    if (!amount) {
      alert("Amount is empty");
      return false;
    }
    if (parseInt(amount) < 1000) {
      alert("Input amount is less than 1000");
      return false;
    } else {
      return true;
    }
  };

  async function handleLoginUser(data: IPayment) {
    try {
      await setToken();
      const amountValue = await checkInputAmount();
      if (amountValue === false) {
        return;
      }
      let userData: any = localStorage.getItem(USER_DATA);
      userData = userData ? JSON.parse(userData) : null;
      console.log("userData", userData?.email);
      setIsLoading(true);
      const response: any = await postRequest("transfer/payment/link", {
        amount: 2000,
        type: "paystack",
      });
      if (response && response?.success === true) {
        console.log("Payment respnse", response.data);
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

  return (
    <div className="w-full flex items-center gap-5">
      <Button
        variant="default"
        size="sm"
        className="bg-white text-[#2A3780] hover:bg-gray-200"
      >
        <Dialog>
          <DialogTrigger> Topup Wallet </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogDescription className="flex flex-col items-center justify-center gap-5">
                <h2 className="text-center font-bold text-xl"> Pay with:</h2>
                <div className="w-full flex items-center justify-center gap-5">
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-[#2A3780] text-white border-2 border-white hover:bg-gray-200 flex items-center gap-2 py-3"
                    onClick={() => {
                      handleLoginUser({ amount: 2000, type: "paystack" });
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
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </Button>
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
