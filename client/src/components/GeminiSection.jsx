import React, { useContext } from "react";
import { Image, SendHorizontal } from "lucide-react";
import QuestionCard from "./QuestionCard";
import { Sparkles } from "lucide-react";
import { context } from "../context/Context";

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
    generateResponse
  } = useContext(context);

  return (
    <div className="flex flex-col justify-between w-full bg-gray-800 inset-0 relative">
      <div className="md:h-20 md:w-full flex justify-between px-2 md:px-5 py-2">
        <h3 className="text-2xl text-gray-400 font-semibold">Gemini</h3>
        {user?.picture && (
          <img
            src={user.picture}
            alt="User-profile"
            className="rounded-full w-9 h-9 md:w-12 md:h-12 object-cover"
          />
        )}
      </div>

      {!showResult ? (
        <div className="px-5 md:w-[100%] md:px-35">
          <div className="pb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-orange-400 to-green-400">
              Hello, {user?.given_name}!
            </h1>
            <h2 className="text-xl md:text-3xl font-bold text-gray-500">
              How can i help you today?
            </h2>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center space-x-2">
            <QuestionCard
              question="What is the best way to learn React?"
              onClick={() => {
                handleQuestionClick("What is the best way to learn React?");
              }}
              hidden="true"
            />
            <QuestionCard
              question="Suggest beautiful places to visit in india."
              onClick={() => {
                handleQuestionClick(
                  "Suggest beautiful places to visit in india."
                );
              }}
            />
            <QuestionCard
              question="What are the latest trends in web development?"
              onClick={() => {
                handleQuestionClick(
                  "What are the latest trends in web development?"
                );
              }}
            />
            <QuestionCard
              question="List down top 5 skills that engineering students should learn in 2025."
              onClick={() => {
                handleQuestionClick(
                  "List down top 5 skills that engineering students should learn in 2025."
                );
              }}
              hidden="true"
            />
          </div>
        </div>
      ) : (
        <div className="w-[80%] mx-auto overflow-y-scroll scrollbar-hide">
          <div className="flex py-5">
            <img
              src={user.picture}
              alt="User-profile"
              className="rounded-full w-8 h-8 object-cover me-3"
            />
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
        <div className="flex justify-between items-center bg-gray-600 py-3 md:py-4 px-3 md:px-5 rounded-full shadow-md w-full">
          <input
            type="text"
            placeholder="Ask Gemini"
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
  );
};

export default GeminiSection;
