import React, { useEffect, useState } from "react";
import { Image, SendHorizontal } from "lucide-react";
import Content from "./Content";
import { useNavigate } from "react-router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Sparkles } from "lucide-react";

const Input = () => {
  const [user, setUser] = useState(null);
  const [input, setInput] = useState("");
  const [geminiResponse, setGeminiResponse] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loader, setLoader] = useState(false);
  const [recentQuery, setRecentQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("CurrentUser");

    if (!currentUser) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const generateResponse = async () => {
    if (!user) return;
    setLoader(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/gemini`,
        {
          query: input,
          userId: user.sub,
        }
      );

      if (response.data.success) {
        setGeminiResponse(response.data.data);
        toast.success(response.data.message);

        setInput("");
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      toast.error(e?.message);
    } finally{
      setLoader(false);
      
    }
  };

  return (
    <div className="flex flex-col justify-between w-full bg-gray-800">
      <div className="h-20 w-full flex justify-between px-5 py-2">
        <h3 className="text-2xl text-gray-400 font-semibold">Gemini</h3>
        {user && user.picture && (
          <img
            src={user.picture}
            alt="User-profile"
            className="rounded-full w-12 h-12 object-cover"
          />
        )}
      </div>
      {!showResult ? (
        <>
          <Content />
        </>
      ) : (
        <div className="w-[80%] block mx-auto overflow-y-scroll scrollbar-hide">
          <div className="flex py-5">
            <img
              src={user.picture}
              alt="User-profile"
              className="rounded-full w-8 h-8 object-cover me-3"
            />
            <p className="text-white font-medium">{recentQuery}</p>
          </div>
          <div className="h-[470px] flex">
            <div className="me-3">
              <Sparkles color="#a9b6ea" />
            </div>
              {loader ? (
                <div className="flex flex-col gap-5 w-full">
                  <div className="w-full border-none rounded-md bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 h-5 animate-pulse"></div>
                  <div className="w-full border-none rounded-md bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 h-5 animate-pulse"></div>
                  <div className="w-full border-none rounded-md bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 h-5 animate-pulse"></div>
                </div>
              ) : (
                <p
                  dangerouslySetInnerHTML={{ __html: geminiResponse }}
                  className="text-white"
                ></p>
              )}
          </div>
        </div>
      )}
      <div className="w-[80%] block mx-auto my-4">
        <div className="flex justify-between items-center bg-gray-600 py-4 px-5 rounded-full shadow-md w-full">
          <input
            type="text"
            placeholder="Ask Gemini"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className="w-full text-white focus:outline-none"
          />
          <div className="flex space-x-3">
            <Image color="#fff" />
            <SendHorizontal
              color="#fff"
              onClick={() => {
                setShowResult(true);
                setRecentQuery(input);
                generateResponse();
              }}
            />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Input;
