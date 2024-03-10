const express = require("express");
require("dotenv").config();
const passport = require("./middleware/googleOauth.js");
const cors = require("cors");
const session = require('express-session');

const connectDb = require("./config/dbConfig.js");
const { addUser, getAllUserOfARoom, getSingleUser, removeUser, getRoomId, addRoomData } = require("./utils/room.js");

const app = express();

// Connect to DB
connectDb(process.env.DB_URL);


app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());

// Setup Session
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{secure:false}
}))

// Setup passport
// Initializing passport
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Welcome to Real time whiteboard backend");
});

app.use("/api/whiteboard", require("./router/index.js"));

const PORT = process.env.PORT || 5050;

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Setting up socket.io connection
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let imgURLGlobal;
io.on("connection",(socket)=>{

  socket.on("userJoined",(data)=>{
    socket.join(data.roomId);
    const users = addUser({...data,socketId:socket.id});

    socket.emit('successfullyJoined',{success:true,data,users});
    socket.broadcast.to(data.roomId).emit("joinNotification",data.userName);
    socket.broadcast.to(data.roomId).emit("allRoomUsers",users);
    socket.broadcast.to(data.roomId).emit("whiteboardDataResponse",{imgURL:imgURLGlobal});
  })

  socket.on("whiteboardData",(data)=>{
    imgURLGlobal = addRoomData(data.roomId,data.canvasImage);
    socket.broadcast.to(data.roomId).emit("whiteboardDataResponse",{
      imgURL:data.canvasImage
    });
  })

  socket.on("leftRoom",()=>{
    const roomId = getRoomId(socket.id)
    const getAllRoomUsers = getAllUserOfARoom(roomId);
    const user = getSingleUser(socket.id,getAllRoomUsers);
    const restUsers = removeUser(socket.id,getAllRoomUsers);
    user?.userName && socket.broadcast.to(roomId).emit("roomLeftNotification",{userName:user?.userName,users:restUsers})
  })

  // chat
  socket.on("SendMessage",(data)=>{
    socket.broadcast.to(data.roomId).emit("messageReceived",data);
  })

  socket.on("disconnect",()=>{
    const roomId = getRoomId(socket.id)
    const getAllRoomUsers = getAllUserOfARoom(roomId);
    const user = getSingleUser(socket.id,getAllRoomUsers);
    const restUsers = removeUser(socket.id,getAllRoomUsers);
    user?.userName && socket.broadcast.to(roomId).emit("roomLeftNotification",{userName:user.userName,users:restUsers})
  })
});
