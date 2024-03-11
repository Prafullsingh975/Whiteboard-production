import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import WhiteboardContextProvider from "./context/WhiteboardContext";
import UserContextProvider from "./context/UserContext.jsx";
import { BrowserRouter, HashRouter } from "react-router-dom";
import SocketProvider from "./context/SocketContext.jsx";
import ChatContextProvider from "./context/ChatContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <WhiteboardContextProvider>
      <UserContextProvider>
        <SocketProvider>
          <ChatContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ChatContextProvider>
        </SocketProvider>
      </UserContextProvider>
    </WhiteboardContextProvider>
  </>,
);
