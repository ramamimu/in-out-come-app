import { defineStore } from "pinia";
import { io } from "socket.io-client";
import { port_web_socket } from "../config/setup";

export const useSocketIO = defineStore("socketIO  ", {
  state: () => ({
    socket: null,
  }),
  actions: {
    setupSocketConnection() {
      this.socket = io(`${window.location.hostname}:${port_web_socket}/chart`);
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
