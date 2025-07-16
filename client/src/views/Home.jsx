import React, { useState, useEffect } from "react";
import SignIn from "./../components/SignIn";
import img from "../assets/homeimg.png";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("CurrentUser");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-900 via-orange-950 to-cyan-900 flex flex-col justify-center items-center">
      <div className="min-h-screen w-full relative">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, #7895ba 1px, transparent 1px),
        linear-gradient(to bottom, #7895ba 1px, transparent 1px)
      `,
            backgroundSize: "30px 35px",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          }}
        />
      </div>
      <div className="w-[600px] z-10 absolute">
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
        <h1 className="text-3xl inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-orange-300 to-green-300 font-extrabold text-center mb-7">
          Your Personal AI Assistant - Fast, Friendly, and Always Available.
        </h1>
        <div className="flex flex-row flex-wrap justify-between font-medium text-md mb-10">
          <h3 className="bg-white p-2 w-[190px] text-center rounded-md my-3">
            💡 Generate Ideas
          </h3>
          <h3 className="bg-white p-2 w-[190px] text-center rounded-md my-3">
            ✍️ Write Articles
          </h3>
          <h3 className="bg-white p-2 w-[190px] text-center rounded-md my-3">
            💬 Chat like a Friend
          </h3>
          <h3 className="bg-white p-2 w-[190px] text-center rounded-md my-3">
            📊 Explain Concepts
          </h3>
          <h3 className="bg-white p-2 w-[190px] text-center rounded-md my-3">
            🔍 Ask Questions
          </h3>
          <h3 className="bg-white p-2 w-[190px] text-center rounded-md my-3">
            🧠 Summarize Text
          </h3>
        </div>
        <div className="flex justify-center items-center">
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default Home;
