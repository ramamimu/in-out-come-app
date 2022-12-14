<script>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import { useSocketIO } from "./stores/socket";
import { Emitter } from "./config/setup";

export default {
  name: "App",
  components: {
    HelloWorld,
    RouterLink,
    RouterView,
  },

  setup() {
    const SocketStore = useSocketIO();
    return { SocketStore };
  },
  async mounted() {
    console.log("async onMounted");
    await this.SocketStore.setupSocketConnection();
    this.SocketStore.emitUIToServer("test", { test: "test" });
    this.SocketStore.socket.on(Emitter.data2UI, (data) => {
      console.log("data2UI", data);
    });
    this.SocketStore.socket.on(Emitter.income, (data) => {
      console.log("income", data);
    });
    this.SocketStore.socket.on(Emitter.outcome, (data) => {
      console.log("outcome", data);
    });
  },
};
</script>

<template>
  <header>
    <nav>
      <!-- <RouterLink to="/">Main</RouterLink>
        <RouterLink to="/about">About</RouterLink> -->
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
