import React, { useState, useEffect } from "react";
import { googleLogout } from "@react-oauth/google";
import {
  Menu,
  Plus,
  MessageSquareMore,
  BadgeQuestionMark,
  Settings,
  Power,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const SideBar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [queriesHistory, setQueriesHistory] = useState([]);
  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const getHistory = async (user) => {
    if (!user) return;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_KEY}/queries?userId=${user.sub}`
      );

      setQueriesHistory(response.data.data);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const deleteQuery = async (_id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_KEY}/query/${_id}`
    );

    if(response.data.success){
      toast.success(response.data.message);
      setQueriesHistory(prev => prev.filter(q => q._id !== _id));
    }else{
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("CurrentUser"));

    if (storedUser) {
      setUser(storedUser);
      getHistory(storedUser);
    } else {
      return;
    }
  }, []);

  const navigate = useNavigate();

  const handleSignout = () => {
    googleLogout();
    localStorage.removeItem("CurrentUser");
    toast.success("Signout successfull");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div
      className={`bg-gray-600 text-white flex flex-col min-h-screen justify-between items-center p-3 ${
        isSideBarOpen ? "w-48" : "w-20"
      } transition-width duration-300`}
    >
      <div className="flex flex-col space-y-5">
        <button onClick={toggleSideBar} className="cursor-pointer mb-8">
          <Menu color="#fff" />
        </button>
        <button className="flex justify-center items-center p-2 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition-colors duration-200">
          <Plus />
          {isSideBarOpen ? <span>New Chat</span> : null}
        </button>
        <div>
          {isSideBarOpen ? <h3 className="mb-3">Recents</h3> : null}
          <p className="flex cursor-pointer h-[400px] overflow-y-scroll scrollbar-hide relative">
            {isSideBarOpen ? (
              <div className="text-sm">
                {queriesHistory.map((item, i) => {
                  return (
                    <div key={i} className="pb-1">
                      <span>
                        <MessageSquareMore
                          color="#f2f2f2"
                          className="w-3 me-1 inline"
                        />
                      </span>
                      {item.query.slice(0, 10)}..{" "}
                      <Trash2 color="#2e3133" className="inline w-[15px] absolute right-0" onClick={()=>{deleteQuery(item._id)}} />
                    </div>
                  );
                })}
              </div>
            ) : null}
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-3 mb-3">
        <button className="flex items-center space-x-2 cursor-pointer">
          <BadgeQuestionMark color="#fff" />
          {isSideBarOpen ? <span>Help</span> : null}
        </button>
        <button className="flex items-center space-x-2 cursor-pointer">
          <Settings color="#fff" />
          {isSideBarOpen ? <span>Settings</span> : null}
        </button>
        <button
          className="flex items-center space-x-2 cursor-pointer"
          onClick={handleSignout}
        >
          <Power color="#fff" />
          {isSideBarOpen ? <span>Sign Out</span> : null}
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default SideBar;
