const users = new Map();
const roomCanvasData = new Map();

// roomCanvasData
const addRoomData = (roomId, data) => {
  roomCanvasData.set(roomId, data);
  return roomCanvasData.get(roomId);
};

// const getRoomData = (roomId) => {
//   return roomCanvasData.get(roomId);
// };

// Users
const addUser = (user) => {
  if (users.has(user.roomId)) {
    const pre = users.get(user.roomId);
    const newData = [...pre, user];
    users.set(user.roomId, newData);
  } else {
    users.set(user.roomId, [user]);
  }
  return users.get(user.roomId);
};

const getSingleUser = (socketId, roomUsers) => {
  return roomUsers?.find((elm) => elm.socketId == socketId);
};

const removeUser = (socketId, roomUsers) => {
  const index = roomUsers?.findIndex((elm) => elm.socketId == socketId);
  roomUsers?.splice(index, 1);
  return roomUsers;
};

const getRoomId = (socketId) => {
  let roomId;
  for (const [key, value] of users) {
    value?.forEach((element) => {
      if (element.socketId == socketId) {
        roomId = key;
      }
    });
  }
  return roomId;
};

const getAllUserOfARoom = (roomId) => {
  return users.get(roomId);
};

module.exports = {
  addUser,
  removeUser,
  getAllUserOfARoom,
  getSingleUser,
  getRoomId,
  addRoomData,
};
