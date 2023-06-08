const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/feedback", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const feedback2_Schema = new mongoose.Schema({
  _id: {
    type: Number,
    unique: true,
    required: true,
    default: 300,
  },
  name1: String,
  Statement1: String,
  next1: String,
  name2: String,
  Statement2: String,
  next2: String,
});

const Feedbackt2 = new mongoose.model("FeedBack2", feedback2_Schema);

async function getLastUsedId() {
  try {
    const lastDocument = await Feedbackt2.findOne({}, "_id")
      .sort({ _id: -1 })
      .lean()
      .exec();

    return lastDocument;
  } catch (error) {
    console.error("Error retrieving last used _id:", error);
  }
}

async function return_data() {
  const data = await Feedbackt2.find();
  console.log(data);
  return data;
}

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  console.log(socket.id);


  let asa = await getLastUsedId(); //gets the last index
  var dd = await return_data(); //gets the to tal rows of data fromm db
  socket.emit("send_last_val", asa,dd);

  socket.on("sending", async (data) => {
    let ss = await getLastUsedId();
    let aa;
    if (ss === null) {
      aa = 299;
    } else {
      aa = ss._id;
    }
    const fb = new Feedbackt2({
      _id: aa + 1,
      name1: data.name1,
      Statement1: data.Statement1,
      next1: data.next1,
      name2: data.name2,
      Statement2: data.Statement2,
      next2: data.next2,
    });
    fb.save();
    console.log("data got saved");
    asa = await getLastUsedId(); //gets the last index
    dd = await return_data(); //gets the to tal rows of data fromm db
    socket.emit("send_last_val", asa, dd);
  });
});

server.listen(3001, () => {
  console.log("Server has started with 3001");
});