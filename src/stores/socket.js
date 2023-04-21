import { defineStore } from "pinia";
import { io } from "socket.io-client";
import { port_web_socket } from "../config/setup";

export const useSocketIO = defineStore("socketIO  ", {
  state: () => ({
    socket: null,
  }),
  actions: {
    setupSocketConnection() {
      this.socket = io(
        `http://${window.location.hostname}:${port_web_socket}/chart`
      );
      // this.socket = io(`http://192.168.236.24:${port_web_socket}/chart`);
      // this.socket = io(`localhost:${port_web_socket}/chart`);
      // this.socket = io(`${window.location.host}/chart`);
      setTimeout(() => {
        console.log(this.socket);
      }, 1000);
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
