import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import {} from "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

import "../dist/bootstrap/css/bootstrap.min.css";
import "../dist/bootstrap/css/dataTables.bootstrap.min.css";
import {} from "../dist/bootstrap/js/bootstrap.bundle.min.js";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(bootstrap);

app.mount("#app");
