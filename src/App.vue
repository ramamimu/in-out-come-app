<script>
import { RouterLink, RouterView } from "vue-router";
import { useSocketIO } from "./stores/socket";
import { Emitter } from "./config/setup";
import { useCRUDStore } from "./stores/counter";

export default {
  name: "App",
  components: {
    RouterLink,
    RouterView,
  },
  setup() {
    const SocketStore = useSocketIO();
    const CRUDStore = useCRUDStore();
    return {
      SocketStore,
      CRUDStore,
    };
  },
  async mounted() {
    console.log("async onMounted");
    await this.SocketStore.setupSocketConnection();
    this.SocketStore.emitUIToServer("test", { test: "test" });
    this.SocketStore.socket.on(Emitter.data2UI, (data) => {
      console.log("data2UI", data);
      this.CRUDStore.transactions = [...data];
    });
    this.SocketStore.socket.on(Emitter.income, (data) => {
      this.CRUDStore.incomes = [...data];
      console.log("income", data);
    });
    this.SocketStore.socket.on(Emitter.outcome, (data) => {
      this.CRUDStore.outcomes = [...data];
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
