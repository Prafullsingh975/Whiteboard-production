import { useEffect, useState } from "react";
import { useChat } from "../../context/ChatContext";
import { useSocket } from "../../context/SocketContext";
import { userState } from "../../context/UserContext";
import ChatSingle from "../ChatSingle";
import RoomUsers from "./RoomUsers";

const Chat = () => {
  const { host,user } = userState();
  const { socket } = useSocket();
  const {chats,setChats} = useChat();
  const [msg, setMsg] = useState("");
// console.log(host);

const messageReceived = (message)=>{
  console.log(message);
  setChats((pre)=>[...pre,message])
}
  const sendMsg = () => {
    socket.emit("SendMessage", { ...host,dp:user.dp, msg });
    setChats((pre)=>([...pre,{...host,dp:user.dp,msg}]));
    setMsg("");
  };

  useEffect(()=>{
    socket.on("messageReceived",messageReceived)
  },[])

  return (
    <div className="fixed right-1 top-24 h-[400px] w-56 rounded-lg bg-slate-200 p-2 shadow-lg">
      <RoomUsers />
      <hr />
      <div className="mb-1 h-[84%] overflow-y-auto">
        {chats?.map((msg,indx)=><ChatSingle key={indx} msg={msg} />)}
      </div>
      <div className="flex">
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Message"
          className="bg-transparent px-1 outline-none"
        />
        <button onClick={sendMsg} type="button" className="text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M3 20v-6l8-2l-8-2V4l19 8z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chat;
