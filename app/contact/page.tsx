import Link from "next/link";

const Contact = () => {
  return (
    <div className="w-full h-[100vh] overflow-y-auto pt-28 pl-10 flex flex-col justify-center items-center gap-1">
      <h1 className="text-4xl"> 😊 </h1>
      <p className="leading-[35.10px] mb-3 md:my-6 lg:my-6 text-base md:text-[27px] lg:text-[27px] text-center font-bold">
        This page is currently in progress and will be available to use in few
        weeks.
      </p>
      <Link href="/wallet" prefetch={false} className="underline">
        {" "}
        You can checkout your &quot;Wallet&quot; that&apos;s currently available{" "}
      </Link>
    </div>
  );
};
export default Contact;
