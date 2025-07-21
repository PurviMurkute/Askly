import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ChevronDown, BadgeQuestionMark, Settings, Power } from "lucide-react";

const SignIn = () => {
  const [user, setUser] = useState(null);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("CurrentUser");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSignout = () => {
    googleLogout();
    localStorage.removeItem("CurrentUser");
    toast.success("SignOut Successfull");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <div>
      {!user ? (
        <div className="border-1 border-orange-800 rounded-md p-1 bg-black">
          <GoogleLogin
          theme="filled_black"
          text="signup_with"
            size="large"
            onSuccess={(credentialResponse) => {
              const decoded = jwtDecode(credentialResponse.credential);
              console.log("login success: ", decoded);
              setUser(decoded);
              localStorage.setItem("CurrentUser", JSON.stringify(decoded));
            }}
            onError={() => {
              console.log("login failed");
            }}
          />
        </div>
      ) : (
        <>
          <div
            className="flex justify-center items-center p-2 hover:bg-[#4d4d4d] rounded-md transition-transform duration-200 relative"
            onClick={toggleDropDown}
          >
            {user?.picture && (
              <img
                src={user.picture}
                alt="User-profile"
                className="rounded-full w-9 h-9 object-cover me-2"
              />
            )}{" "}
            <p className="text-white">{user.name}</p>
            <ChevronDown color="#fff" />
          </div>
          {isDropDownOpen ? (
            <div className="bg-[#595959] w-[200px] rounded-2xl absolute bottom-16 left-2 flex flex-col justify-start items-start text-white shadow-xl p-3 z-50">
              <div className="flex items-center w-full gap-2 px-2 py-1 hover:bg-white/10 rounded-md cursor-pointer">
                <img
                  src={user.picture}
                  alt="user-profile"
                  className="rounded-full w-8 h-8"
                />
                <div className="truncate">
                  <h3 className="font-medium text-sm truncate">{user.name}</h3>
                  <h5 className="font-light text-xs truncate">{user.email}</h5>
                </div>
              </div>

              <hr className="my-2 border-white/30 w-full" />

              <button className="w-full text-sm px-3 py-2 flex items-center gap-2 hover:bg-white/10 rounded-md">
                <Settings className="w-5 h-5" /> Settings
              </button>

              <button className="w-full text-sm px-3 py-2 flex items-center gap-2 hover:bg-white/10 rounded-md">
                <BadgeQuestionMark className="w-5 h-5" /> Help
              </button>

              <hr className="my-2 border-white/30 w-full" />

              <button className="w-full text-sm font-semibold px-3 py-2 flex items-center gap-2 hover:bg-red-600/80 hover:text-white rounded-md transition" onClick={handleSignout}>
                <Power className="w-5 h-5" /> Sign Out
              </button>
            </div>
          ) : null}
        </>
      )}
      <Toaster />
    </div>
  );
};

export default SignIn;
