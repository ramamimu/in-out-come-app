import { WebSocket } from "./WebSocket.js";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { Emitter } from "../config/setup.js";

const IO = new WebSocket();
const colRef = collection(db, "MoneyTracker");

onSnapshot(colRef, (querySnapshot) => {
  let temp = [];
  querySnapshot.docs.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    temp.push({ id: doc.id, ...doc.data() });
  });
  IO.data = temp;
  IO.emitData(Emitter.data2UI, temp);
  IO.emitData(Emitter.income, IO.getDailyInOut(0));
  IO.emitData(Emitter.outcome, IO.getDailyInOut(1));
});

IO.socket.of("/chart").on("connection", (socket) => {
  console.log("a user connected");

  socket.on(Emitter.data2Server, (msg) => {
    console.log("chat message ", msg);
  });

  socket.emit(Emitter.data2UI, IO.data);
  socket.emit(Emitter.income, IO.getDailyInOut(0));
  socket.emit(Emitter.outcome, IO.getDailyInOut(1));

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// localhost:9090/add?mutation=1&id="20123802010"
IO.APP.post("/add", (req, res) => {
  console.log(req.body);
  console.log(req.query.id);
  switch (req.query.mutation) {
    // income
    case "0":
      console.log("income");
      break;
    // outcome
    case "1":
      console.log("outcome");
      break;
    default:
      console.log("lain");
      break;
  }
  res.send("Hello bang!");
});

// localhost:9090/edit?mutation=1&id="20123802010"
IO.APP.post("/edit", (req, res) => {
  console.log(req.body);
  console.log(req.query.id);
  switch (req.query.mutation) {
    // income
    case "0":
      console.log("income");
      break;
    // outcome
    case "1":
      console.log("outcome");
      break;
    default:
      console.log("lain");
      break;
  }
  res.send("Hello bang!");
});

// localhost:9090/delete?id="20123802010"
IO.APP.post("/delete", (req, res) => {
  console.log(req.query.id);
  res.send("i will delete later");
});
