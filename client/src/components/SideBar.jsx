import { useState, useEffect, useContext } from "react";
import { Menu, X, Plus, MessageSquareMore, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { context } from "../context/Context";
import SignIn from "./SignIn";

const SideBar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [queriesHistory, setQueriesHistory] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedQuery, setSearchedQuery] = useState([]);

  const { user, handlePastQueClick } = useContext(context);

  const toggleSidebar = () => {
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

  useEffect(() => {
    const searchedQueries = queriesHistory.filter((query) => {
      if (query.query.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
    setSearchedQuery(searchedQueries);
  }, [searchText, queriesHistory]);

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
    if (user) getHistory(user);
  }, [user]);

  return (
    <>
    <div className="flex justify-center items-center gap-2 fixed top-3 left-2  z-10 lg:hidden">
      <Menu
        color="#fff"
        className="w-[30px] cursor-pointer"
        onClick={toggleSidebar}
      />
      <h3 className="text-2xl text-orange-400/70 font-bold">Askly</h3>
      </div>
      <div
        className={`w-[85%] md:w-[50%] lg:w-1/5 bg-[#262626] fixed top-0 left-0 h-full flex flex-col z-10 lg:z-0 ${
          isSideBarOpen ? "block" : "hidden lg:block"
        }`}
      >
        <div className="flex items-center">
          <X
            className="block text-white ms-2 cursor-pointer lg:hidden"
            onClick={() => {
              setIsSideBarOpen(false);
            }}
          />
          <h3 className="text-2xl text-orange-400/70 font-bold p-3">Askly</h3>
        </div>
        <hr className="text-white" />
        <button className="flex justify-center items-center w-[200px] p-3 my-5 mx-3 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition-colors duration-200">
          <Plus />
          <span className="text-sm md:text-md">New Chat</span>
        </button>
        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            className="text-white w-full me-10 px-3 py-2 focus:outline-none"
          />
        </div>
        <hr className="my-2 border-white/30 w-full" />
        <div className="mx-3 text-white">
          <h3 className="mb-3">Recents</h3>
          <div className="flex cursor-pointer h-[350px] md:h-[400px] overflow-y-scroll scrollbar-hide relative">
            <div className="text-sm w-[75%]">
              {searchText ? (
                searchedQuery.length === 0 ? (
                  <div className="text-gray-400 px-3 py-2">
                    No results found
                  </div>
                ) : (
                  searchedQuery.map((item, i) => (
                    <div
                      key={i}
                      className="relative group hover:bg-gray-500 px-3 py-1 rounded-lg flex justify-between"
                    >
                      <div className="flex justify-start">
                        <MessageSquareMore
                          color="#f2f2f2"
                          className="w-3 me-1 inline"
                        />
                        <span
                          onClick={() => {handlePastQueClick(item), setIsSideBarOpen(false)}}
                          className="cursor-pointer"
                        >
                          {item.query.slice(0, 20)}...
                        </span>
                      </div>
                      <Trash2
                        color="#fff"
                        className="inline w-[15px] absolute right-2 top-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                        onClick={() => deleteQuery(item._id)}
                      />
                    </div>
                  ))
                )
              ) : (
                queriesHistory.map((item, i) => (
                  <div
                    key={i}
                    className="relative group hover:bg-gray-500 px-3 py-1 rounded-lg flex justify-between"
                  >
                    <div className="flex justify-start">
                      <MessageSquareMore
                        color="#f2f2f2"
                        className="w-3 me-1 inline"
                      />
                      <span
                        onClick={() => {handlePastQueClick(item), setIsSideBarOpen(false)}}
                        className="cursor-pointer"
                      >
                        {item.query.slice(0, 20)}...
                      </span>
                    </div>
                    <Trash2
                      color="#fff"
                      className="inline w-[15px] absolute right-2 top-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                      onClick={() => deleteQuery(item._id)}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="fixed bottom-3 left-3">
          <SignIn />
        </div>
      </div>

      <Toaster />
    </>
  );
};

export default SideBar;
