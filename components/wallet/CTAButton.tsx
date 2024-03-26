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

const CTAButton = () => {
  const userString =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const user = userString ? JSON.parse(userString) : null;

  /********* PayStack Config *********/

  const configPayStack = {
    reference: new Date().getTime().toString(),
    email: "jibola422@gmail.com",
    amount: 200000,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY as string,
  };
  const onSuccess = (reference: string) => {
    console.log(reference);
  };
  const onClose = () => {
    console.log("closed");
  };

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
                      handlePaystackPayment({ onSuccess, onClose });
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
