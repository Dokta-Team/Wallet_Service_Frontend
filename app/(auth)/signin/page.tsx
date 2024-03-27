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
import { useToast } from "@/components/ui/use-toast";
import { setToken } from "@/utils/axiosInstance";

interface IUser {
  full_name: string;
  email: string;
  password: string;
  repeat_password: string;
}
const SignIn = () => {
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
      setIsLoading(true);
      const response: any = await loginRequest("user/signin", data);
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
        setIsLoading(false);
        router.push("/wallet");
      } else {
        //alert(response.message);
        toast({
          variant: "destructive",
          description: (
            <div className="w-full flex flex-col">{response?.message}</div>
          ),
        });
        setIsLoading(false);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: (
          <div className="w-full flex flex-col">{error?.message}</div>
        ),
      });
      setIsLoading(false);
    }
  }

  const { pending } = useFormStatus();
  const { toast } = useToast();

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
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-full md:w-[65%] lg:w-[65%] h-full flex flex-col justify-center items-center relative">
        <Image
          src="/dokta-logo.png"
          width={150}
          height={150}
          alt="Logo"
          className="mb-10 block md:hidden lg:hidden"
        />
        <h1 className="uppercase text-4xl font-semibold mb-10"> Sign In </h1>
        <p className="text-base text-gray-400 text-center w-full md:w-[40%] lg:w-[40%] mb-10 px-10 md:px-0 lg:px-0">
          {" "}
          To keep connected with us, kindly sign in with your personal info{" "}
        </p>

        <form
          className="w-full md:w-[50%] lg:w-[50%] px-10 md:px-0 lg:px-0"
          onSubmit={handleSubmit(handleLoginUser)}
        >
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
          <div className="w-full flex justify-center items-center mb-5 md:mb-0 lg:mb-0">
            <Button
              variant="default"
              size="sm"
              type="submit"
              disabled={pending}
              aria-disabled={pending}
              className="bg-[#8797ed] w-[80%] py-3 rounded-3xl mx-auto hover:bg-transparent hover:text-[#8797ed] hover:border-[#8797ed] hover:border-2"
            >
              Sign In
            </Button>
          </div>
          <div className="w-full flex md:hidden lg:hidden items-center justify-center gap-2">
            <p>Don&apos;t have an account yet?</p>
            <Link href="/signup" prefetch={false} className="text-[#8797ed]">
              {" "}
              Sign up{" "}
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
          className="mb-36"
        />
        <h1 className="text-4xl mb-8 font-medium relative before:absolute before:w-[20%] before:h-[3px] before:bg-white before:bottom-[-40%] before:left-1/2 before:translate-x-[-50%] before:translate-y-[-50%]">
          {" "}
          Welcome Back{" "}
        </h1>
        <p className="text-base text-center w-[60%] mb-5">
          {" "}
          If you don&apos;t have an account yet, sign up. You are welcome
        </p>

        <Link href="/signup">
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent border-white border-2 rounded-3xl px-10 py-5 hover:text-[#8797ed]"
          >
            {" "}
            Sign up now
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default SignIn;
