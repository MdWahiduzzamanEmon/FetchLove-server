const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const port = process.env.PORT||500;
const server = http.createServer(app);

// const { Server } = require("socket.io");
// const io = new Server(server);

const io = socketIO(server);
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
const users=[{}]

io.on("connection", (socket) => {
  // console.log("a user connected");

 

  socket.on("message", ({message,id}) => {
    console.log(message, id);
   io.emit("sendMessage", { user: users[id], message, id });
})

  socket.on("joined", ({ name }) => {

    if (name === undefined) {
      return;
    } else {
      users[socket.id] = name;
       socket.broadcast.emit("userJoined", {
         user: "Admin",
         message: `${users[socket.id]} has joined`,
       });
       socket.emit("welcome", {
         user: "Admin",
         message: `Welcome to the chat ${users[socket.id]}`,
       });
    }
    
    console.log(name, "has joined")
   
  })
   socket.on("disconnect", () => {
     socket.broadcast.emit("leave", {
       user: "Admin",
       message: `${users[socket.id]},User has left`,
     });
     // console.log("user disconnected");
   });
  
});



app.get("/", (req, res) => {

  res.send("Hello FetchLove Online Chat!");
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
