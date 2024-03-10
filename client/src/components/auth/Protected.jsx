import React from "react";
import { userState } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
//   const { user } = userState();
const user = JSON.parse(sessionStorage.getItem("u"));
  return <>{user ? children : <Navigate to={"/signin"} />}</>;
};

export default Protected;
