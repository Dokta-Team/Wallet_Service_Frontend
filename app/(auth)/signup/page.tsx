"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ImSpinner2 } from "react-icons/im";
import { useRouter } from "next/navigation";
import { loginRequest, postRequest } from "@/utils/apiRequest";
import { useForm, SubmitHandler } from "react-hook-form";
import { useFormStatus } from "react-dom";
import { toast } from "@/components/ui/use-toast";
import { setToken } from "@/utils/axiosInstance";

interface IUser {
  full_name: string;
  email: string;
  password: string;
  repeat_password: string;
}
const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IUser>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLoginUser(data: IUser) {
    try {
      const response: any = await loginRequest("user/signup", data);
      if (response && response?.success === true) {
        await setToken(response.token);
        //alert(response.message);
        toast({
          variant: "default",
          description: (
            <div className="w-full flex flex-col justify-center items-center gap-3">
              <p className="text-lg"> Welcome!!! </p>
              <ImSpinner2 className="text-[#18283f] animate-spin ml-2" />
            </div>
          ),
        });
        router.push("/wallet");
      } else {
        //alert(response.message);
        toast({
          variant: "destructive",
          description: (
            <div className="w-full flex flex-col">{response?.message}</div>
          ),
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: (
          <div className="w-full flex flex-col">{error?.message}</div>
        ),
      });
    }
  }

  {
    isLoading &&
      toast({
        variant: "default",
        description: (
          <div className="w-full flex flex-col justify-center items-center gap-3">
            <p className="text-lg"> Submitting... </p>
            <ImSpinner2 className="text-[#18283f] animate-spin ml-2" />
          </div>
        ),
      });
  }

  return (
    <div className="w-full h-[100vh] flex md:justify-center lg:justify-center items-center overflow-y-auto md:overflow-y-hidden lg:overflow-y-hidden">
      <div className="w-full md:w-[65%] lg:w-[65%] h-full flex flex-col justify-center items-center relative mt-20 md:mt-0 lg:mt-0">
        <Image
          src="/dokta-logo.png"
          width={150}
          height={150}
          alt="Logo"
          className="mb-10 mt-20 block md:hidden lg:hidden"
        />
        <h1 className="uppercase text-4xl font-semibold mb-10"> Sign Up </h1>
        <p className="text-base text-gray-400 text-center w-full md:w-[40%] lg:w-[40%] mb-10 px-10 md:px-0 lg:px-0">
          {" "}
          To keep connected with us, kindly sign up with your personal info{" "}
        </p>

        <form
          className="w-full md:w-[50%] lg:w-[50%] px-10 md:px-0 lg:px-0"
          onSubmit={handleSubmit(handleLoginUser)}
        >
          <div className="w-full h-fit flex flex-col gap-3 mb-8">
            <p> Full Name </p>
            <input
              type="text"
              placeholder="John Doe"
              className="outline-0 border-b-2 border-[#8797ed]"
              {...register("full_name", { required: true })}
            />
          </div>
          <div className="w-full h-fit flex flex-col gap-3 mb-8">
            <p> Email Id </p>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="johndoe@gmail.com"
              className="outline-0 border-b-2 border-[#8797ed]"
            />
          </div>
          <div className="w-full h-fit flex flex-col gap-3 mb-10">
            <p> Password </p>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="**********"
              className="outline-0 border-b-2 border-[#8797ed]"
            />
          </div>
          <div className="w-full h-fit flex flex-col gap-3 mb-10">
            <p>Confirm Password </p>
            <input
              type="password"
              {...register("repeat_password", { required: true })}
              placeholder="**********"
              className="outline-0 border-b-2 border-[#8797ed]"
            />
          </div>
          <div className="w-full flex justify-center items-center mb-5 md:mb-0 lg:mb-0">
            <Button
              variant="default"
              size="sm"
              type="submit"
              disabled={isLoading}
              aria-disabled={isLoading}
              className="bg-[#8797ed] w-[80%] py-3 rounded-3xl mx-auto hover:bg-transparent hover:text-[#8797ed] hover:border-[#8797ed] hover:border-2"
            >
              Sign Up
            </Button>
          </div>
          <div className="w-full flex md:hidden lg:hidden items-center justify-center gap-2 mb-10">
            <p>Already have an account?</p>
            <Link href="/signin" prefetch={false} className="text-[#8797ed]">
              {" "}
              Sign in{" "}
            </Link>
          </div>
        </form>

        <Image
          src="/pill.png"
          width={250}
          height={250}
          alt="Pills"
          className="absolute left-0 bottom-0 opacity-20"
        />
      </div>
      <div className="w-full md:w-[35%] lg:w-[35%] h-full flex-col justify-center items-center text-white bg-[#8797ed] hidden md:flex lg:flex">
        <Image
          src="/dokta-logo.png"
          width={150}
          height={150}
          alt="Logo"
          className="md:mb-36 lg:mb-36"
        />
        <h1 className="text-4xl mb-8 font-medium relative before:absolute before:w-[20%] before:h-[3px] before:bg-white before:bottom-[-40%] before:left-1/2 before:translate-x-[-50%] before:translate-y-[-50%]">
          {" "}
          Welcome{" "}
        </h1>
        <p className="text-base text-center w-[60%] mb-5">
          {" "}
          If you already have an account, sign in. We&apos;ve missed you.
        </p>

        <Link href="/signin">
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent border-white border-2 rounded-3xl px-10 py-5 hover:text-[#8797ed]"
          >
            {" "}
            Sign in
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default SignUp;
