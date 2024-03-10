import { useEffect, useState } from "react";
import { generateRoomId } from "../utils/roomIdGenerator";
import { useNavigate } from "react-router-dom";
import { userState } from "../context/UserContext";
import { useSocket } from "../context/SocketContext";

const JoineRoom = () => {
  const [roomId, setRoomId] = useState(generateRoomId());
  const { user, setHost,setUsers } = userState();
  const { socket } = useSocket();
  const [pastedRoomId, setPastedRoomId] = useState("");
  const navigate = useNavigate();

  const handleGenerateRoom = () => {
    // setRoomId(generateRoomId());
    const roomData = {
      userName: user.displayName,
      userId: user._id,
      roomId,
      isHost: true,
      isPresenter: true,
    };
    socket?.emit("userJoined", roomData);
  };

  const handleJoinRoom = () => {
    const roomData = {
      userName: user.displayName,
      userId: user._id,
      roomId: pastedRoomId,
      isHost: false,
      isPresenter: false,
    };
    socket?.emit("userJoined", roomData);
  };

  const handleSuccessfullyJoined = (data) => {
    if (data.success) {
      setHost(data.data);
      setUsers(data.users)
      navigate(`/room/${data.data.roomId}`);
    } else setHost(null);
  };

  const allRoomUsers = (data)=>{
    setUsers(data);
  }

  // Socket.io
  useEffect(() => {
    socket?.on("successfullyJoined", handleSuccessfullyJoined);
    socket?.on("allRoomUsers",allRoomUsers);
  }, []);
  return (
    <div className="flex h-screen w-screen items-center justify-between bg-slate-900 px-16 text-white">
      <div className="w-1/2">
        <h2 className="text-3xl font-semibold">
          Premium live sharing whiteboard.
        </h2>
        <h2 className="text-3xl font-semibold">Free for everyone.</h2>
        <p className="my-10">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur eos
          odit molestias facilis reiciendis iste harum nesciunt maiores enim
          illum.
        </p>
        {/* Generate Room Input */}
        <div className=" flex items-center gap-5">
          <div className="flex h-10 w-7/12 items-center overflow-hidden rounded-md text-white">
            <input
              className="h-full w-11/12 bg-gray-700 p-3 placeholder-slate-300 outline-none"
              type="text"
              name="roomId"
              value={roomId}
              placeholder="Generate room code"
              disabled
            />
            <button
              className="h-full cursor-not-allowed bg-slate-700 text-slate-500"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 256 256"
              >
                <path
                  fill="currentColor"
                  d="M184 64H40a8 8 0 0 0-8 8v144a8 8 0 0 0 8 8h144a8 8 0 0 0 8-8V72a8 8 0 0 0-8-8m-8 144H48V80h128Zm48-168v144a8 8 0 0 1-16 0V48H72a8 8 0 0 1 0-16h144a8 8 0 0 1 8 8"
                />
              </svg>
            </button>
          </div>
          <button
            onClick={handleGenerateRoom}
            className="rounded-md bg-blue-600 px-2 py-2 hover:bg-blue-700 active:bg-blue-700"
            type="button"
          >
            Create
          </button>
        </div>
        {/* Join Room Input */}
        <div className=" mt-5 flex items-center gap-5">
          <div className="flex h-10 w-7/12 items-center overflow-hidden rounded-md text-white">
            <input
              className="h-full w-full bg-gray-700 p-3 placeholder-slate-300 outline-none"
              type="text"
              name="pastedRoomId"
              value={pastedRoomId}
              onChange={(e) => setPastedRoomId(e.target.value)}
              placeholder="Past room code"
            />
          </div>
          <button
            onClick={handleJoinRoom}
            className={`${
              pastedRoomId ? "cursor-pointer bg-blue-600" : "cursor-not-allowed"
            } rounded-md px-5 py-2 text-slate-100 hover:bg-blue-700 active:bg-blue-700`}
            type="button"
          >
            Join
          </button>
        </div>
      </div>
      <div className="flex w-1/2 items-center justify-center">
        <img
          src="https://www.gstatic.com/meet/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg"
          alt="img"
        />
      </div>
    </div>
  );
};

export default JoineRoom;
