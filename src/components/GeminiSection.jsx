import React, { useEffect, useState } from "react";
import { Avatar } from "flowbite-react";
import { Image, SendHorizontal } from "lucide-react";
import Content from "./Content";
import { useNavigate } from "react-router";

const Input = () => {
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{
    const currentUser = localStorage.getItem("CurrentUser");

    if(!currentUser){
      setTimeout(()=>{
        navigate('/');
      }, 2000)
    }else{
      setUser(JSON.parse(currentUser));
    }
  }, [user])
  return (
    <div className="flex flex-col justify-between w-full">
      <div className="h-12 w-full flex justify-between px-5 py-2">
        <h3 className="text-2xl text-gray-500 font-semibold">Gemini</h3>
        <Avatar img={user.picture} alt="User-profile" className="rounded-full" />
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
