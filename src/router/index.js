import {createRouter, createWebHashHistory} from "vue-router";
import ViewNotes from "../views/ViewNotes.vue";
import ViewStats from "../views/ViewStats.vue";

const routes = [
  {
    path: '/',
    component: ViewNotes,
    name: 'notes',
  },
  {
    path: '/stats',
    component: ViewStats,
    name: 'stats',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router