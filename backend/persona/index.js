const Message = require('../models/conversationgraph')
const redisAdapter = require("socket.io-redis");

const io = require('socket.io')({
  path: '/doctor/persona'
});

io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));

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