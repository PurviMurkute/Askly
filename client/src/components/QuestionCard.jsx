import React from "react";

const QuestionCard = ({ question, onClick }) => {
  return (
    <div
      className={`bg-[#4d4d4d] border-1 border-gray-500 py-2 md:py-10 px-5 my-2 rounded-2xl shadow-lg w-[140px] h-[180px] lg:w-[270px] md:h-[180px] cursor-pointer hover:scale-97 transition-transform duration-300`}
      onClick={onClick}
    >
      <p className="text-gray-300 font-medium hover:text-blue-200 transition-colors duration-150">
        {question}
      </p>
    </div>
  );
};

export default QuestionCard;
