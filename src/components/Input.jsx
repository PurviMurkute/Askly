import React from "react";
import { Avatar } from "flowbite-react";
import { Image, SendHorizontal } from "lucide-react";
import Content from "./Content";

const Input = () => {
  return (
    <div className="flex flex-col justify-between w-full">
      <div className="h-12 w-full flex justify-between px-5 py-2">
        <h3 className="text-2xl text-gray-400 font-semibold">Gimini</h3>
        <Avatar img="https://i.pravatar.cc/300" alt="User Avatar" rounded />
      </div>
      <Content/>
      <div className="w-[85%] block mx-auto my-4">
        <div className="flex justify-between items-center bg-gray-100 py-4 px-5 rounded-full shadow-md w-full">
          <input
            type="text"
            placeholder="Ask to gemini..."
            className="w-full focus:outline-none"
          />
          <div className="flex space-x-3">
            <Image />
            <SendHorizontal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
