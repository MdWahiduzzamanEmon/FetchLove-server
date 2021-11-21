const http = require("http");
const express = require("express");
const cors = require("cors");
// const socketIO = require("socket.io");

const app = express();
const port = process.env.PORT||500;
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

// const io = socketIO(server);

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});



app.get("/", (req, res) => {
  res.send("Hello FetchLove Online Chat!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
