import React, { useState, useEffect, useContext } from "react";
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
import { context } from "../context/Context";

const SideBar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [queriesHistory, setQueriesHistory] = useState([]);
  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const {
      setUser,
      handleQuestionClick,
    } = useContext(context);

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

    if (response.data.success) {
      toast.success(response.data.message);
      setQueriesHistory((prev) => prev.filter((q) => q._id !== _id));
    } else {
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
      className={`bg-gray-600 text-white flex flex-col min-h-screen justify-between px-3 py-1 ${
        isSideBarOpen ? "w-[230px]" : "w-20"
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
          <div className="flex cursor-pointer h-[400px] overflow-y-scroll scrollbar-hide relative">
            {isSideBarOpen ? (
              <div className="text-sm w-[100%]">
                {queriesHistory.map((item, i) => (
                  <div
                    key={i}
                    className="relative group hover:bg-gray-500 px-3 py-1 rounded-lg flex justify-between"
                  >
                    <div className="flex justify-start">
                      <span>
                        <MessageSquareMore
                          color="#f2f2f2"
                          className="w-3 me-1 inline"
                        />
                      </span>

                      <span className="" onClick={()=>{handleQuestionClick(item.query)}}>
                        {item.query.slice(0, 8)}...
                      </span>
                    </div>
                    <Trash2
                      color="#fff"
                      className="inline w-[15px] absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                      onClick={() => deleteQuery(item._id)}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
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
