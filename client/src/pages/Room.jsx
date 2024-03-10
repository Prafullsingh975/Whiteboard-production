import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import Canvas from "../components/whiteboard/Canvas";
import Chat from "../components/whiteboard/Chat";
import SideToolbar from "../components/whiteboard/SideToolbar";
import Toolbar from "../components/whiteboard/Toolbar";
import { WhiteboardState } from "../context/WhiteboardContext";
import { userState } from "../context/UserContext";
import { useSocket } from "../context/SocketContext";
import { useChat } from "../context/ChatContext";

const Room = () => {
  const { showSidebar, setShowSidebar } = WhiteboardState();
  const { socket } = useSocket();
  const { host, user, setUsers } = userState();
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [img, setImg] = useState();
  const {setChats} = useChat()

  useEffect(() => {
    socket.on("joinNotification", (data) => {
      toast.info(`${data} joined the room`);
    });
    socket.on("whiteboardDataResponse", (data) => {
      setImg(data.imgURL);
    });

    socket.on("roomLeftNotification", (data) => {
      toast.error(`${data.userName} left the room`);
      setUsers(data.users);
    });

    return () => {
      socket.emit("leftRoom", { roomId: user.roomId });
      setChats([]);
    };
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col items-center px-8 pt-6">
      {host?.isPresenter && (
        <Toolbar
          setShowSidebar={setShowSidebar}
          canvasRef={canvasRef}
          ctxRef={ctxRef}
        />
      )}
      <div className="mt-5 flex w-full justify-between">
        {showSidebar && <SideToolbar />}
        {host?.isPresenter ? (
          <Canvas canvasRef={canvasRef} ctxRef={ctxRef} />
        ) : (
          <>
            {/* Showing canvas image to user other tha host */}
            <div className="fixed left-0 top-0 z-0 h-full w-full">
              <img
                src={img}
                alt="Real time white board image shared by presenter"
                className="h-full w-full"
              />
            </div>
          </>
        )}
        <Chat />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Room;
