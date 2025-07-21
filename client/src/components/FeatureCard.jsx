import React from "react";

const FeatureCard = ({ icon, text }) => {
  return (
    <div className="border-1 border-gray-400 p-2 w-[150px] flex flex-col items-center rounded-2xl my-1 md:my-3">
      <p className="text-2xl">{icon}</p>
      <p className=" text-white">{text}</p>
    </div>
  );
};

export default FeatureCard;
