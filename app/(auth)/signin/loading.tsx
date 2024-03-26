import React from "react";
import { ImSpinner2 } from "react-icons/im";

interface Props {}

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[100vh] w-full">
      <ImSpinner2 className="text-[#8797ed] h-20 w-20 animate-spin " />
    </div>
  );
};

export default Loading;
