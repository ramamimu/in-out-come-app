import { Server } from "socket.io";
import Express from "express";
import Http from "http";
import { port_web_socket } from "../config/setup.js";

export class WebSocket {
  socket;
  port = port_web_socket;
  data = [];
  APP = Express();

  constructor() {
    const THAT = this;
    const SERVER = Http.createServer(this.APP);
    THAT.socket = new Server(SERVER, {
      cors: {
        origins: ["http://localhost:5173", "*"],
      },
    });
    this.APP.use(Express.json());
    this.APP.use(Express.urlencoded({ extended: true }));
    SERVER.listen(THAT.port, () => {
      console.log(`listening on port socket: ${THAT.port}`);
    });
  }

  emitData(emitter, data) {
    const THAT = this;
    THAT.socket.of("/chart").emit(emitter, data);
  }

  getDailyInOut(index) {
    const THAT = this;
    let temp = [];
    THAT.data.forEach((item) => {
      temp.push({ ...item, date: new Date(parseInt(item.date)) });
    });

    if (index == 0) {
      temp = temp.filter((item) => item.mutation === 0);
    } else {
      temp = temp.filter((item) => item.mutation === 1);
    }

    // get daily income
    let dailyIncome = [];
    temp.forEach((item) => {
      let date = item.date;
      let amount = item.amount;
      let index = dailyIncome.findIndex((item) => {
        return (
          item.date.getDate() === date.getDate() &&
          item.date.getMonth() === date.getMonth() &&
          item.date.getFullYear() === date.getFullYear()
        );
      });
      if (index === -1) {
        dailyIncome.push({
          date: date,
          amount: amount,
        });
      } else {
        dailyIncome[index].amount += amount;
      }
    });

    console.log(dailyIncome);
    return dailyIncome;
  }
}
