import { createContext, useContext, useState } from "react";

const chatContext = createContext();

const ChatContextProvider = ({ children }) => {
    const [chats,setChats] = useState([]);
  return <chatContext.Provider value={{chats,setChats}}>{children}</chatContext.Provider>;
};

export const useChat = ()=>useContext(chatContext);

export default ChatContextProvider;
