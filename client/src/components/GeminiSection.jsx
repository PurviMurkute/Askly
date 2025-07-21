import React, { useContext } from "react";
import { Image, SendHorizontal, User } from "lucide-react";
import QuestionCard from "./QuestionCard";
import { Sparkles } from "lucide-react";
import { context } from "../context/Context";
import SideBar from "./SideBar";
import FeatureCard from "./FeatureCard";
import toast, { Toaster } from "react-hot-toast";

const GeminiSection = () => {
  const {
    user,
    input,
    setInput,
    geminiResponse,
    showResult,
    setShowResult,
    loader,
    recentQuery,
    setRecentQuery,
    handleQuestionClick,
    generateResponse,
  } = useContext(context);

  return (
    <>
      <SideBar />
      <div className="flex flex-col justify-between w-full bg-[#404040] inset-0 relative md:ms-[15%]">
        <div className="md:h-20 md:w-full flex justify-end px-2 md:px-5 py-2">
          {user ? (
            <img
              src={user.picture}
              alt="User-profile"
              className="rounded-full w-9 h-9 md:w-11 md:h-11 object-cover"
            />
          ) : (
            <User className="rounded-full w-9 h-9 md:w-11 md:h-11 object-cover bg-[#262626] text-white p-2" />
          )}
        </div>

        {!showResult ? (
          <div className="px-5 md:w-[100%] md:px-10">
            <div className="pb-10 flex flex-col justify-center items-center">
              <h1 className="text-xl md:text-2xl font-bold text-gray-300/80">
                Your Personal AI Assistant - Fast, Friendly, and Always
                Available.
              </h1>
              <h2 className="text-xl md:text-3xl font-bold text-gray-300/50">
                How can i help you today?
              </h2>
              <div className="flex flex-wrap justify-evenly gap-2 my-5">
                <FeatureCard icon="💡" text="Generate Ideas" />
                <FeatureCard icon="✍️" text="Write Articles" />
                <FeatureCard icon="💬" text="Chat like a Friend" />
                <FeatureCard icon="📊" text="Explain Concepts" />
                <FeatureCard icon="🔍" text="Ask Questions" />
                <FeatureCard icon="🧠" text="Summarize Text" />
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center space-x-2">
              <QuestionCard
                question="What is the best way to learn React?"
                onClick={() => {
                  user
                    ? handleQuestionClick(
                        "What is the best way to learn React?"
                      )
                    : toast.error("Login first to Search");
                }}
                hidden="true"
              />
              <QuestionCard
                question="Suggest beautiful places to visit in india."
                onClick={() => {
                  user
                    ? handleQuestionClick(
                        "What is the best way to learn React?"
                      )
                    : toast.error("Login first to Search");
                }}
              />
              <QuestionCard
                question="What are the latest trends in web development?"
                onClick={() => {
                  user
                    ? handleQuestionClick(
                        "What is the best way to learn React?"
                      )
                    : toast.error("Login first to Search");
                }}
              />
              <QuestionCard
                question="List down top 5 skills that engineering students should learn in 2025."
                onClick={() => {
                  user
                    ? handleQuestionClick(
                        "What is the best way to learn React?"
                      )
                    : toast.error("Login first to Search");
                }}
                hidden="true"
              />
            </div>
          </div>
        ) : (
          <div className="w-[80%] mx-auto overflow-y-scroll scrollbar-hide">
            <div className="flex py-5">
              {user ? (
                <img
                  src={user.picture}
                  alt="User-profile"
                  className="rounded-full w-8 h-8 object-cover me-3"
                />
              ) : (
                <User className="rounded-full w-8 h-8 object-cover bg-[#262626] text-white p-2" />
              )}
              <p className="text-white font-medium">{recentQuery}</p>
            </div>
            <div className="h-[470px] flex">
              <div className="me-3 py-4">
                <Sparkles color="#a9b6ea" />
              </div>
              {loader ? (
                <div className="flex flex-col gap-5 w-full">
                  <div className="w-full rounded-md bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 h-5 animate-pulse"></div>
                  <div className="w-full rounded-md bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 h-5 animate-pulse"></div>
                  <div className="w-full rounded-md bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 h-5 animate-pulse"></div>
                </div>
              ) : (
                <p
                  dangerouslySetInnerHTML={{ __html: geminiResponse }}
                  className="text-white leading-9 p-3 text-md"
                ></p>
              )}
            </div>
          </div>
        )}

        <div className="w-[90%] md:w-[80%] mx-auto my-4">
          <div className="flex justify-between items-center bg-gray-500 py-3 md:py-4 px-3 md:px-5 rounded-full shadow-md w-full">
            <input
              type="text"
              placeholder="Ask Gemini"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setShowResult(true);
                  setRecentQuery(input);
                  generateResponse();
                }
              }}
              className="w-full text-white focus:outline-none"
            />
            <div className="flex space-x-1 md:space-x-3">
              <Image color="#fff" />
              <SendHorizontal
                color="#fff"
                onClick={() => {
                  setShowResult(true);
                  setRecentQuery(input);
                  generateResponse();
                }}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      <Toaster/>
    </>
  );
};

export default GeminiSection;
