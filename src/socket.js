const { getKeyByValue } = require("./helper/helper");
const Chat = require("./models/chat");
const User = require("./models/user");

//Socket connection
function socket(io) {
  let app_users = {};

  io.on("connection", (socket) => {
    console.log("This is my socket id: " + socket.id);

    socket.on("join", async (data) => {
      const { userId } = data;
      console.log("username: " + userId);

      app_users[userId] = socket.id;
      const userData = await User.findById(userId);

      //Emitting New Username to Clients
      socket.broadcast.emit("user_join", userData);

      // announcements
      const count = await Chat.find().countDocuments();
      for (let i = 0; i < count; i++) {
        // const element = adminChats[i];
        const adminChat = await Chat.findOne().skip(i);

        setTimeout(() => {
          socket.emit("receive_message", {
            senderId: adminChat.sender,
            message: adminChat.message,
            createdAt: adminChat.createdAt,
            type: "incoming",
          });
        }, (i + 1) * 1000);
      }

      console.log("app_users::", app_users);
    });

    //Emitting messages to Clients
    socket.on("send_message", async (data) => {
      const { senderId, receiverId, message } = data;
      const createdAt = new Date();

      console.log("app_users::", app_users);
      console.log("data: ", data);
      console.log("send_message socketId::", app_users[receiverId]);

      const socketId = app_users[receiverId];
      io.to(socketId).emit("receive_message", {
        senderId,
        message,
        createdAt,
        type: "incoming",
      });
    });

    //Remove user from memory when they disconnect
    socket.on("disconnecting", async (data) => {
      console.log("disconnect=======================", data);
      console.log("app users=======================", app_users);
      const userId = getKeyByValue(app_users, socket.id);
      delete app_users[userId];

      const userData = await User.findById(userId);

      if (userData) {
        userData.status = "offline";
        await userData.save();
        socket.broadcast.emit("user_left", userId);
      }
    });
  });
}

module.exports = socket;
