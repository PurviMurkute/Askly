import React from "react";
import { Route, Routes } from "react-router";
import Gemini from "./views/Gemini";
import { ContextProvider } from "./context/Context";

const App = () => {
  return <div>
    <ContextProvider>
    <Routes>
      <Route path="/" element={<Gemini/>}></Route>
    </Routes>
    </ContextProvider>
  </div>;
};

export default App;
