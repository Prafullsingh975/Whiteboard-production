import { Navigate, Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Layout from "./Layout";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import JoinRoom from "./pages/JoineRoom";
import Room from "./pages/Room";
import { useEffect } from "react";
import axios from "axios";
import { userState } from "./context/UserContext";
import { io } from "socket.io-client";
import { useSocket } from "./context/SocketContext";
import Protected from "./components/auth/Protected";
import JoineRoom from "./pages/JoineRoom";

// Setup Socket io on client
const server = "https://whiteboard-production.onrender.com";
const socketOptions = {
  forceNew: true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};
const socket = io(server, socketOptions);

const App = () => {
  const { setUser, user } = userState();
  const { setSocket } = useSocket();

  const loginUser = JSON.parse(sessionStorage.getItem("u"));

  const isLogin = async () => {
    if (!loginUser || loginUser?.googleId) {
      const { data } = await axios.get(
        "https://whiteboard-production.onrender.com/api/whiteboard/auth/is-login",
        { withCredentials: true },
      );
      sessionStorage.setItem("u", JSON.stringify(data.data));
      setUser(data.data);
    } else {
      setUser(loginUser);
    }
    // console.log(user);
  };
  
  useEffect(() => {
    isLogin();
    setSocket(socket);
  }, []);
  // console.log(user?._id);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
          path="/room"
          element={
            <Protected>
              <JoineRoom />
            </Protected>
          }
        />
        <Route
          path="/signin"
          element={!user ? <Signin /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to={"/"} />}
        />
      </Route>

      <Route
        path="/room/:id"
        element={
          <Protected>
            <Room />
          </Protected>
        }
      />
    </Routes>
  );
};

export default App;
