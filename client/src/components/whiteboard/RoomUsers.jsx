import React, { useState } from "react";
import { userState } from "../../context/UserContext";
import SingleUser from "./SingleUser";

const RoomUsers = () => {
  const { users } = userState();
  const [showUsers, setShowUsers] = useState(false);

  const handleShowUsers = () => {
    setShowUsers((pre) => !pre);
  };
  return (
    <>
      <div className="mb-1 flex items-center justify-between">
        <h3 className="font-semibold text-green-500">Users : {users.length}</h3>
        <button
          onClick={handleShowUsers}
          className="rounded-md bg-gray-900 px-2 py-1 text-slate-100 hover:bg-gray-700"
          type="button"
        >
          {showUsers ? "Hide Users" : "Show Users"}
        </button>
      </div>
      <div className="h-max-[80px]">
        {showUsers &&
          users.map((user) => <SingleUser key={user.userId} uData={user} />)}
      </div>
    </>
  );
};

export default RoomUsers;
