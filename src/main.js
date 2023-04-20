import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./bootstrap/css/bootstrap.min.css";
import "./bootstrap/css/dataTables.bootstrap.min.css";
import {} from "./bootstrap/js/bootstrap.bundle.min.js";
import VueApexCharts from "vue3-apexcharts";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueApexCharts);

app.mount("#app");
