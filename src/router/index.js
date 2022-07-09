import {createRouter, createWebHashHistory} from "vue-router";
import ViewNotes from "../views/ViewNotes.vue";
import ViewStats from "../views/ViewStats.vue";
import ViewEditNote from "../views/ViewEditNote.vue";
import VueAuth from "../views/VueAuth.vue";

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
  {
    path: '/editNote/:id',
    component: ViewEditNote,
    name: 'edit-note',
  },
  {
    path: '/auth',
    component: VueAuth,
    name: 'auth',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router