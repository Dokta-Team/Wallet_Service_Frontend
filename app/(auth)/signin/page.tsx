"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { redirect } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { BiLoaderAlt } from "react-icons/bi";
import { useRouter } from "next/router";

const SignIn = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-[65%] h-full flex flex-col justify-center items-center relative">
        <h1 className="uppercase text-4xl font-semibold mb-10"> Sign In</h1>
        <p className="text-base text-gray-400 text-center w-[40%] mb-10">
          {" "}
          To keep connected with us, kindly sign in with your personal info{" "}
        </p>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            const storedUser = localStorage.getItem("user");
            if (!storedUser) {
              // Handle case when user is not found
              toast({
                title: "User not found. Please sign up.",
                variant: "destructive",
                description: (
                  <div className="w-full mt-3 flex justify-center items-center">
                    {" "}
                    <BiLoaderAlt className="h-4 w-4 animate-spin" />{" "}
                  </div>
                ),
              });
              setSubmitting(false);
              return;
            }

            const user = JSON.parse(storedUser);
            if (
              values.email !== user.email ||
              values.password !== user.password
            ) {
              // Handle case when email or password is invalid
              setErrors({ password: "Invalid email or password." });
              setSubmitting(false);
              return;
            }

            // Handle successful login
            setTimeout(() => {
              console.log("Login successful!");
              toast({
                title: "Success",
                description: "Login successful",
                variant: "default",
              });
              setSubmitting(false);
              // Redirect user after successful login
              // Example: router.push('/dashboard');
            }, 3000);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="w-[50%]">
              <div className="w-full h-fit flex flex-col gap-3 mb-8">
                <p> Email Id </p>
                <Field
                  type="email"
                  name="email"
                  placeholder="johndoe@gmail.com"
                  className="outline-0 border-b-2 border-[#8797ed]"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="w-full h-fit flex flex-col gap-3 mb-10">
                <p> Password </p>
                <Field
                  type="password"
                  name="password"
                  placeholder="**********"
                  className="outline-0 border-b-2 border-[#8797ed]"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="w-full flex justify-end mb-10">
                <p className="font-medium text-sm cursor-pointer">
                  {" "}
                  Forgot Your Password?{" "}
                </p>
              </div>
              <div className="w-full flex justify-center items-center">
                <Button
                  variant="default"
                  size="sm"
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#8797ed] w-[80%] py-3 rounded-3xl mx-auto hover:bg-transparent hover:text-[#8797ed] hover:border-[#8797ed] hover:border-2"
                >
                  {isSubmitting ? "Processing..." : "Sign In"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        <Image
          src="/pill.png"
          width={250}
          height={250}
          alt="Pills"
          className="absolute left-0 bottom-0 opacity-20"
        />
      </div>
      <div className="w-[35%] h-full flex flex-col justify-center items-center text-white bg-[#8797ed]">
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
