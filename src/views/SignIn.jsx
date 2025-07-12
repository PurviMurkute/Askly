import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import startIcon from "./../assets/starticon.png";
import { Link, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

const SignIn = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("CurrentUser");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const navigate = useNavigate();

  const handleSignin = () => {
    toast.loading("redirecting to gemini...")
    setTimeout(()=>{
      navigate('/gemini')
    }, 3000)
  }

  const handleSignout = () => {
    googleLogout();
    localStorage.removeItem("CurrentUser");
    toast.success("SignOut Successfull");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 to-gray-800 flex justify-center items-center">
      <div className="">
        {!user ? (
          <GoogleLogin
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
        ) : (
          <div>
            <div className="flex flex-row justify-center items-center bg-white px-5 py-2 w-[300px] rounded-md shadow-md cursor-pointer">
              <img
                src={user.picture}
                alt="user-profile"
                className="rounded-full w-12 me-3 "
              />
              <div>
                <h3 className="font-bold">{user.name}</h3>
                <h5 className="font-light">{user.email}</h5>
              </div>
            </div>

            <button className="bg-red-500 px-5 py-2 block mx-auto my-3 font-medium text-white w-[300px] rounded-md cursor-pointer" onClick={handleSignin}>
              Let's Start{" "}
              <img src={startIcon} alt="start-icon" className="inline w-6" />
            </button>

            <button
              className="block mx-auto my-5 text-white font-medium cursor-pointer"
              onClick={handleSignout}
            >
              SignOut
            </button>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default SignIn;
