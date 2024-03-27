"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdSimCardDownload } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { TiPlusOutline } from "react-icons/ti";
import {
  FaMapMarkedAlt,
  FaHospital,
  FaHandHoldingMedical,
  FaNotesMedical,
  FaAmbulance,
  FaBookMedical,
} from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

export default function Home() {
  const options = [
    { title: "Hospital Nearby", icon: FaHospital, link: "", key: "" },
    { title: "Medical Recipe", icon: FaBookMedical, link: "", key: "" },
    { title: "Ambulance Call", icon: FaAmbulance, link: "", key: "" },
    { title: "Specialist Listing", icon: FaNotesMedical, link: "", key: "" },
    {
      title: "Routine Check Up",
      icon: FaHandHoldingMedical,
      link: "",
      key: "",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col">
      <div
        className="w-full h-[100vh] pt-0 md:pt-10 lg:pt-10 bg-fixed bg-top"
        style={{
          backgroundImage:
            "linear-gradient(to right bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/dokta-banner.jpeg)",
        }}
      >
        <div className="w-full md:w-1/2 lg:w-1/2 h-full flex flex-col justify-center pl-5 md:pl-10 lg:pl-10 text-white gap-10">
          <h1 className="text-4xl md:text-7xl lg:text-7xl font-bold leading-[1.4] md:leading-[1.2] lg:leading-[1.2]">
            {" "}
            Feel Better <br /> About Finding <br /> Healthcare{" "}
          </h1>
          <p className="font-normal text-base hidden md:block lg:block">
            {" "}
            We take the guesswork out by finding the right <br /> Doctors,
            Specialists, Hospitals and care for you and your family{" "}
          </p>
          <p className="font-normal text-base block md:hidden lg:hidden">
            {" "}
            We take the guesswork out by finding the right Doctors, Specialists,
            Hospitals and care for you and your family{" "}
          </p>
          <Link prefetch={false} href="" className="flex items-center gap-3">
            <Button
              variant="default"
              size="sm"
              className="bg-[#2A3780] w-fit px-5 py-2"
            >
              <MdSimCardDownload className="" />
              <p className="text-base font-medium">Download App Now</p>
              <FaArrowRight />
            </Button>
          </Link>
        </div>
        <div className="w-[90%] md:w-[70%] lg:w-[70%] h-fit p-5 rounded-lg bg-white absolute left-[50%] bottom-[-30%] md:bottom-[-55%] lg:bottom-[-55%] translate-x-[-50%] translate-y-[-50%] drop-shadow-md">
          <div className="w-full h-auto flex items-center gap-5 mb-10 flex-col md:flex-row lg:flex-row">
            <div className="w-full h-auto border-2 rounded-lg border-gray-300 p-2 flex gap-3 items-center">
              <div className="w-fit h-fit border-2 border-[#2A3780] rounded-full">
                <TiPlusOutline className="text-base text-[#2A3780]" />
              </div>
              <input
                type="text"
                placeholder="Search Doctor, Specialists, Hospital ..."
                className="border-none outline-none w-full"
              />
            </div>
            <div className="w-full h-auto border-2 rounded-lg border-gray-300 p-2 flex gap-3 items-center">
              <FaMapMarkedAlt className="text-lg text-[#2A3780]" />
              <input
                type="text"
                placeholder="Set your location"
                className="border-none outline-none w-full"
              />
            </div>
            <Button
              variant="default"
              size="sm"
              className="bg-[#2A3780] w-full md:w-fit lg:w-fit flex items-center gap-3"
            >
              {" "}
              <IoSearch className="text-lg" />{" "}
              <p className="inline md:hidden lg:hidden"> Search </p>
            </Button>
          </div>
          <div className="w-full h-fit items-center justify-between mb-5 hidden md:flex lg:flex">
            <p className="text-base font-medium"> You may be looking for </p>
            <div className="flex items-center gap-3 cursor-pointer">
              <p className="text-[#2A3780] text-sm"> See more </p>
              <FaArrowRight className="text-[#2A3780] text-base" />
            </div>
          </div>
          <div className="w-full h-fit hidden md:flex lg:flex items-center justify-between gap-3">
            {options.map((option, key) => (
              <div
                className="w-fit h-fit py-5 px-3 bg-white drop-shadow-md cursor-pointer flex flex-col gap-5 items-center justify-center rounded-lg"
                key={key}
              >
                <div className="w-fit h-fit p-3 rounded-full bg-white drop-shadow-md">
                  {React.createElement(option?.icon, { size: "22" })}
                </div>
                <p className="text-base font-medium text-[#2A3780]">
                  {option?.title}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-auto pt-40 md:pt-64 lg:pt-64 px-5 md:px-0 lg:px-0">
          <div className="w-full h-[100vh] flex items-center flex-col md:flex-row lg:flex-col">
            <div className="w-full md:w-1/2 lg:w-1/2 h-full flex flex-col justify-center md:pl-10 lg:pl-10">
              <h2 className="text-3xl md:text-5xl lg:text-5xl leading-[1.4] md:leading-[1.3] lg:leading-[1.3] font-semibold mb-10 text-center md:text-justify lg:text-justify ">
                {" "}
                We Always Ensure Best <br /> Medical Treatment <br /> For Your
                Health{" "}
              </h2>
              <p className="text-gray-400 font-normal text-base mb-10">
                There are many variations passages of your health available but
                the majority have suffered alteration in some form, by injected
                humour. We are a startup with a mission to save millionsof
                lives.
              </p>
              <Link prefetch={false} href="/consultation">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-[#2A3780] w-fit px-5 py-3"
                >
                  {" "}
                  Start Consultation
                </Button>
              </Link>{" "}
            </div>
            <div className="w-full md:w-1/2 lg:w-1/2 h-full relative">
              {/***** 
              <Image
                src="/doctor.jpeg"
                width={300}
                height={500}
                alt="consultation"
                className="object-cover object-center absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] rounded-lg"
              />
              *****/}
              <div
                className="w-[50%] h-[70%] object-contain object-center absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] rounded-lg"
                style={{ backgroundImage: "url(/doctor.jpeg)" }}
              />

              <div className="" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
