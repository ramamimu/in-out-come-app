import { defineStore } from "pinia";
import { io } from "socket.io-client";
import { port_web_socket } from "../config/setup";

export const useSocketIO = defineStore("socketIO  ", {
  state: () => ({
    socket: null,
    interval: 0,
  }),
  actions: {
    setupSocketConnection() {
      // this.socket = io(`http://192.168.236.24:${port_web_socket}/chart`);
      // this.socket = io(`localhost:${port_web_socket}/chart`);
      // this.socket = io(`${window.location.host}/chart`);
      const THAT = this;
      this.socket = io(
        `http://${window.location.hostname}:${port_web_socket}/chart`
      );
      this.interval = setInterval(() => {
        console.log(this.socket);
        if (!this.socket.connected) {
          THAT.socket = io(
            `http://${window.location.hostname}:${port_web_socket}/chart`
          );
          console.log("try to reconnect to server");
        } else {
          clearInterval(THAT.interval);
          console.log("clear the interval");
        }
        console.log(this.socket);
      }, 5000);
    },
    emitUIToServer(emitter, data) {
      const THAT = this;
      const EMITTER = emitter;
      const DATA = data;
      THAT.socket.emit(EMITTER, DATA);
    },
    disconnect() {
      if (this.socket) {
        this.socket.disconnect();
      }
    },
  },
});
