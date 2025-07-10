import React, { useState } from "react";
import {
  Menu,
  Plus,
  MessageSquareMore,
  BadgeQuestionMark,
  Settings,
  Power,
} from "lucide-react";

const SideBar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <div className={`bg-gray-200 flex flex-col min-h-screen justify-between items-center p-3 ${isSideBarOpen ? 'w-44' : 'w-16'} transition-width duration-300`}>
      <div className="flex flex-col space-y-5">
        <button onClick={toggleSideBar} className="cursor-pointer mb-8"><Menu /></button>
        <button className="flex justify-center items-center p-2 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition-colors duration-200">
          <Plus/>{isSideBarOpen?<span>New Chat</span> : null}
        </button>
        <div>
          {isSideBarOpen?<h3 className="mb-2">Recents</h3> : null}
          <p className="flex items-center space-x-2 cursor-pointer">
            <MessageSquareMore color="gray" className="w-5" />
            {isSideBarOpen? <span className="text-sm">Message 1...</span> : null}
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-3 mb-3">
        <button className="flex items-center space-x-2 cursor-pointer">
          <BadgeQuestionMark />
          {isSideBarOpen ? <span>Help</span> : null}
        </button>
        <button className="flex items-center space-x-2 cursor-pointer">
          <Settings />
          {isSideBarOpen ? <span>Settings</span> : null}
        </button>
        <button className="flex items-center space-x-2 cursor-pointer">
          <Power />
          {isSideBarOpen ? <span>Sign Out</span> : null}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
