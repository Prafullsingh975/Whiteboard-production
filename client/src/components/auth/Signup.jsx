import { useState } from "react";
import axios from "axios";
import { userState } from "../../context/UserContext";

const Signup = () => {
  const { config,setUser } = userState();
  const initialSignUpState = {
    displayName: "",
    email: "",
    password: "",
  };
  const [signUpInput, setSignUpInput] = useState(initialSignUpState);

  const handleSignUpWithGoogle = () => {
    window.open("https://whiteboard-production.onrender.com/api/whiteboard/auth/google", "_self");
  };

  const handleSignUpInput = (e) => {
    const { name, value } = e.target;
    setSignUpInput((pre) => ({ ...pre, [name]: value }));
  };
  const handleSignUpWithJWT = async () => {
    try {
      const { data } = await axios.post(
        "https://whiteboard-production.onrender.com/api/whiteboard/auth/signup",
        signUpInput,
        config,
      );
      sessionStorage.setItem("u", JSON.stringify(data));
      setUser(data);
      setSignUpInput(initialSignUpState);
    } catch (error) {
      console.error("Error in Signup wit JWT", error);
    }
  };

  return (
    <div className="flex  h-screen w-full items-center justify-center overflow-hidden bg-slate-900 text-white">
      <div className="w-2/3 flex-col justify-center p-10 text-center">
        <h1 className="pb-5 text-center text-3xl font-semibold max-sm:text-lg">
          Register your Account
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
              value={signUpInput.displayName}
              onChange={handleSignUpInput}
              className="inp"
              type="text"
              placeholder="Enter your name"
              name="displayName"
            />
            <input
              value={signUpInput.email}
              onChange={handleSignUpInput}
              className="inp mt-3"
              type="text"
              placeholder="Enter your email"
              name="email"
            />
            <input
              value={signUpInput.password}
              onChange={handleSignUpInput}
              className="inp mt-3"
              type="password"
              placeholder="Enter your password"
              name="password"
            />
            <button
              className="mt-3 flex h-10 w-full items-center justify-between rounded-md bg-gradient-to-r from-teal-600 to-orange-200  p-1 pl-3 font-semibold text-black active:bg-gradient-to-r active:from-orange-200 active:to-orange-300"
              type="button"
              onClick={handleSignUpWithJWT}
            >
              Create your account
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
              onClick={handleSignUpWithGoogle}
              className="flex h-10 w-full items-center justify-between rounded-md bg-gradient-to-r from-teal-600 to-orange-200 p-0.5"
              type="button"
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
                Sign up with google
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
