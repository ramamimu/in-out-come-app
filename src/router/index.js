import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import CreateView from "../views/CreateView.vue";
import EditView from "../views/EditView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Main",
      component: MainView,
    },
    {
      path: "/Create",
      name: "Create",
      component: CreateView,
    },
    {
      path: "/Edit/:id",
      name: "Edit",
      component: EditView,
    },
  ],
});

export default router;
