import React from "react";
import SignIn from "./views/SignIn";
import { Route, Routes } from "react-router";
import Gemini from "./views/Gemini";

const App = () => {
  return <div>
    <Routes>
      <Route path="/" element={<SignIn/>}></Route>
      <Route path="/gemini" element={<Gemini/>}></Route>
    </Routes>
  </div>;
};

export default App;
