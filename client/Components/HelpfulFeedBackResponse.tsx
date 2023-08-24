import React from "react";
import thanku from "@/public/asset/thankufeedback.png";
import Image from "next/image";

const HelpfulFeedBackResponse = () => {
  return (
    <div className="w-full">
      <div className="bg-[#f7ffff] flex flex-col justify-center gap-10">
        <Image src={thanku} alt="feedback image" className="self-center" />
        <p className="text-center text-gray-600 text-xl">
          Thank you for your feedback
        </p>
      </div>
    </div>
  );
};

export default HelpfulFeedBackResponse;
