import React, { useState, useEffect } from "react";
import SignIn from "./SignIn";
import img from "./../assets/homeimg.png";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("CurrentUser");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center items-center">
      <div className="w-[650px]">
        <div className="mt-2 mb-6">
          <img
            src={img}
            alt="home-img"
            className="bg-gradient-to-r from-blue-400 via-orange-400 to-green-400 p-5 rounded-full block mx-auto w-[120px]"
          />
          <h2 className="text-xl font-bold text-white text-center py-2">
            Gemini Clone
          </h2>
        </div>
        <h1 className="text-3xl inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-orange-400 to-green-400 font-bold text-center mb-10">
          Your Personal AI Assistant - Fast, Friendly, and Always Available.
        </h1>
        <div className="flex flex-row flex-wrap justify-between font-medium text-md mb-15">
          <h3 className="bg-white p-2 w-[190px] text-center rounded-md my-3">
            💡 Generate Ideas
          </h3>
          <h3 className="bg-white p-2 w-[200px] text-center rounded-md my-3">
            ✍️ Write Articles
          </h3>
          <h3 className="bg-white p-2 w-[200px] text-center rounded-md my-3">
            💬 Chat like a Friend
          </h3>
          <h3 className="bg-white p-2 w-[200px] text-center rounded-md my-3">
            📊 Explain Concepts
          </h3>
          <h3 className="bg-white p-2 w-[200px] text-center rounded-md my-3">
            🔍 Ask Questions
          </h3>
          <h3 className="bg-white p-2 w-[200px] text-center rounded-md my-3">
            🧠 Summarize Text
          </h3>
        </div>
        <div className="flex justify-center items-center">
            <SignIn/>
        </div>
      </div>
    </div>
  );
};

export default Home;
