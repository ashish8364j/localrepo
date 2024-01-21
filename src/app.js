require("dotenv").config();
const app = require("./appp.js");
const connectDb = require("./db/dbconnect.js");
const http = require("http");
const socketIO = require("socket.io");
const wpusermessagemodel = require("./models/wpmodel/wpmessages.js");
const wpuseremailmodel = require("./models/wpmodel/wpauth.model.js");
const server = http.createServer(app);
const io = socketIO(server);
const logger = require("./utils/consolelog.js");
port = process.env.PORT;
url = process.env.MONGODB_URI;
io.on("connection", (socket) => {
  if (socket.handshake != undefined) {
    const _id = socket.handshake.auth.userIdd;
    const updateuser = async () => {
      await wpuseremailmodel.findByIdAndUpdate(_id, { isOnline: "online" });
    };
    updateuser();
  }
  socket.on("new_message", (data) => {
    wpusermessagemodel.create(data);
    io.emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    if (socket.handshake != undefined) {
      const _id = socket.handshake.auth.userIdd;
      const updateuser = async () => {
        await wpuseremailmodel.findByIdAndUpdate(_id, { isOnline: "offline" });
      };
      updateuser();
    }
  });
});
connectDb(url)
  .then(() => {
    server.listen(port, "0.0.0.0", () => {
      logger.info(`Server running at : ${port}`);
    });
  })
  .catch((error) => {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  });
