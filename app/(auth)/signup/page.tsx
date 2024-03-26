"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { redirect } from "next/navigation";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobileNumber: Yup.string().required("Mobile Number is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-[65%] h-full flex flex-col justify-center items-center relative">
        <h1 className="uppercase text-4xl font-semibold mb-10"> Sign Up</h1>
        <p className="text-base text-gray-400 text-center w-[40%] mb-10">
          {" "}
          To keep connected with us, kindly sign up with your personal info{" "}
        </p>

        <Formik
          initialValues={{
            fullName: "",
            email: "",
            mobileNumber: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setIsLoading(true); // Set loading state to true
            localStorage.setItem("user", JSON.stringify(values));

            setTimeout(() => {
              setIsLoading(false);
              setSubmitting(false);
              redirect(`/`);
            }, 3000);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="w-[50%]">
              <div className="w-full h-fit flex flex-col gap-3 mb-8">
                <p> Full Name </p>
                <Field
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  className="outline-0 border-b-2 border-[#8797ed]"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500"
                />
              </div>
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
              <div className="w-full h-fit flex flex-col gap-3 mb-8">
                <p> Mobile Number </p>
                <Field
                  type="tel"
                  name="mobileNumber"
                  placeholder="+234 807..."
                  className="outline-0 border-b-2 border-[#8797ed]"
                />
                <ErrorMessage
                  name="mobileNumber"
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
              <div className="w-full flex justify-center items-center">
                <Button
                  variant="default"
                  size="sm"
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="bg-[#8797ed] w-[80%] py-3 rounded-3xl mx-auto hover:bg-transparent hover:text-[#8797ed] hover:border-[#8797ed] hover:border-2"
                >
                  {isLoading ? "Loading..." : "Sign Up"}
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
