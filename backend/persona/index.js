const Message = require('../models/conversationgraph')
// const { io } = require("../bin/www");
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
//avoiding errors while feteching the data from the  db.
app.use(cors)
//making a server for requests
const server = http.createServer(app);
const io = require("socket.io")(server, { //providing an address and connect it to the backend
  // cors: {
    origins: "*:*",
    // methods: ["GET", "POST"],
    path:"/doctor/persona",
    // allowedHeaders: ["my-custom-header"],
    // credentials: true,
    transports: ["websocket"]
  // }
});

// const io = io.of('/doctor/persona');

//returns the last index which is got used form the front end
async function getLastUsedId(){
  try {
    return await Message.findOne({}, "_id")
      .sort({ _id: -1 })
      .lean()
      .exec();
  } catch (error) {
    console.error("Persona.GetLastUsedId : Error retrieving last used Message by Persona _id = ", error);
  }
}

// returns all the data from the database in the form of object
async function return_data(){
  const data = await Message.find();
  console.log(data);
  return data;
}

io.on("connection", async (socket) => {
  console.log(socket.id);

  let index_obj  = await getLastUsedId(); //gets the last index
  let data = await return_data(); //gets the to tal rows of data fromm db
  socket.emit("send_last_val", index_obj,data);//sends the index and total data to front end

  socket.on("connect_error", err => {
    console.log('persona.connect_error. err instanceof Error = ', err instanceof Error); // true
    console.log('persona.connect_error. err.message = ', err.message); // not authorized
    console.log('persona.connect_error. err.data = ', err.data); // { content: "Please retry later" }
  });

  socket.on("sending", async (data) => {
    console.log("socket has received ping")
    let index = await getLastUsedId();
    let a;
    if (index === null) {
      a = 299;
    } else {
      a = index._id;
    }
    const message = new Message({
      _id: a + 1,
      name1: data.name1,
      Statement1: data.Statement1,
      next1: data.next1,
      name2: data.name2,
      Statement2: data.Statement2,
      next2: data.next2,
    });
    Message.create(message);
    console.log(`message saved with _id = ${message._id}`);
    index_obj  = await getLastUsedId(); //gets the last index
    data = await return_data(); //gets the to tal rows of data fromm db
    socket.emit("send_last_val", index_obj, data);
  });
});

module.exports.io = io