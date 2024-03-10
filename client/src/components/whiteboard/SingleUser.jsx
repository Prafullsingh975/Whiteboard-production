import React from "react";
import { userState } from "../../context/UserContext";

const SingleUser = ({uData}) => {
    const {user} = userState();
    console.log(uData);
  return (
    <>
      <div className="shadow-md rounded-sm my-2">
        <span className="flex gap-2 p-1">
          {/* Presenter Logo */}
          {uData?.isPresenter && <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M21 3H3c-1.1 0-2 .9-2 2v8h2V5h18v16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2"
            />
            <circle cx="9" cy="10" r="4" fill="currentColor" />
            <path
              fill="currentColor"
              d="M15.39 16.56C13.71 15.7 11.53 15 9 15s-4.71.7-6.39 1.56A2.97 2.97 0 0 0 1 19.22V22h16v-2.78c0-1.12-.61-2.15-1.61-2.66"
            />
          </svg>}
          {uData.userName }
          {user._id == uData.userId && " (You)"}
          {/* {user?._id != uData?.userId && user?.displayName} */}
        </span>
      </div>
    </>
  );
};

export default SingleUser;
