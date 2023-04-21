<script>
import { RouterView } from "vue-router";
import { useSocketIO } from "./stores/socket";
import { Emitter } from "./config/setup";
import { useCRUDStore } from "./stores/counter";
import HeaderVue from "./components/Header.vue";
import ToastVue from "./components/Toast.vue";
import { useToast } from "./stores/toast";

export default {
  name: "App",
  components: {
    RouterView,
    HeaderVue,
    ToastVue,
  },
  setup() {
    const SocketStore = useSocketIO();
    const CRUDStore = useCRUDStore();
    const TOAST_STATE = useToast();
    return {
      SocketStore,
      CRUDStore,
      TOAST_STATE,
    };
  },
  async beforeMount() {
    console.log("async beforeMount");
    await this.SocketStore.setupSocketConnection();
  },
  async mounted() {
    console.log("async onMounted");
    console.log("window location => ", window.location.host);
    console.log("window location hostname => ", window.location.hostname);
    console.log("env => ", import.meta.env.VITE_ADDR_DEP);

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
  <ToastVue v-if="TOAST_STATE.toast.status" />
  <header>
    <HeaderVue />
  </header>

  <RouterView />
</template>

<style scoped></style>
