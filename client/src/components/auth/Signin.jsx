import { useState } from "react";
import { userState } from "../../context/UserContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const { config,setUser } = userState();
  const initialSignInState = {
    email: "",
    password: "",
  };
  const [loginInput, setLoginInput] = useState(initialSignInState);
  const navigate = useNavigate();

  const handleSignInWithGoogle = () => {
    window.open("http://localhost:5050/api/whiteboard/auth/google", "_self");
  };

  const handleLoginInput = (e) => {
    const {name,value} = e.target;
    setLoginInput((pre)=>({...pre,[name]:value}));
  };

  const handleJWTLogin = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5050/api/whiteboard/auth/login",
        loginInput,
        config,
      );
      sessionStorage.setItem("u", JSON.stringify(data));
      setUser(data);
      setLoginInput(initialSignInState);
      navigate("/");
    } catch (error) {
      return console.error("error in JWT login", error);
    }
  };
  
  return (
    <div className="flex  h-screen w-full items-center justify-center overflow-hidden bg-slate-900 text-white">
      <div className="w-2/3 flex-col justify-center p-10 text-center">
        <h1 className="pb-5 text-center text-3xl font-semibold">
          Login to your Account
        </h1>
        <p className="w-full px-36 text-center text-slate-300">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          maiores rerum ipsum possimus enim excepturi inventore quo earum
          voluptas. Dignissimos voluptates tempore eum reiciendis doloribus hic
          enim nihil velit ratione.
        </p>
        <div className="mt-8 flex w-full justify-between py-5">
          <div className="w-2/5">
            <input
              className="block h-10 w-full rounded-md bg-gray-700 p-3 text-white placeholder-white outline-none"
              type="text"
              name="email"
              onChange={handleLoginInput}
              value={loginInput.email}
              placeholder="Enter your email"
            />
            <input
              className="mt-3 block h-10 w-full rounded-md bg-gray-700 p-3 text-white placeholder-white outline-none"
              type="password"
              name="password"
              onChange={handleLoginInput}
              value={loginInput.password}
              placeholder="Enter your password"
            />
            <button
              onClick={handleJWTLogin}
              className="mt-3 flex h-10 w-full items-center justify-between rounded-md bg-gradient-to-r from-teal-600 to-orange-200  p-1 pl-3 font-semibold text-black active:bg-gradient-to-r active:from-orange-200 active:to-orange-300"
              type="button"
            >
              Login to your account
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="23"
                viewBox="0 0 32 32"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 16h21m-7-8l8 8l-8 8"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-center">
            <span>OR</span>
          </div>
          <div className="flex w-2/5 items-center">
            <button
              className="flex h-10 w-full items-center justify-between rounded-md bg-gradient-to-r from-teal-600 to-orange-200 p-0.5"
              type="button"
              onClick={handleSignInWithGoogle}
            >
              <div className="flex h-full w-full items-center justify-between bg-slate-900 pr-2 font-semibold text-white active:bg-teal-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="23"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 11h8.533c.044.385.067.78.067 1.184c0 2.734-.98 5.036-2.678 6.6c-1.485 1.371-3.518 2.175-5.942 2.175A8.976 8.976 0 0 1 3 11.98A8.976 8.976 0 0 1 11.98 3c2.42 0 4.453.89 6.008 2.339L16.526 6.8C15.368 5.681 13.803 5 12 5a7 7 0 0 0 0 14c3.527 0 6.144-2.608 6.577-6H12z"
                  />
                </svg>
                Sign in with google
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
