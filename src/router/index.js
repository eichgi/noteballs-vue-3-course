import {createRouter, createWebHashHistory} from "vue-router";
import {useStoreAuth} from "../stores/storeAuth";
import ViewNotes from "../views/ViewNotes.vue";
import ViewStats from "../views/ViewStats.vue";
import ViewEditNote from "../views/ViewEditNote.vue";
import VueAuth from "../views/VueAuth.vue";
import Profile from "../views/Profile.vue";
import ViewUsers from "../views/ViewUsers.vue";

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
  {
    path: '/profile',
    component: Profile,
    name: 'profile',
  },
  {
    path: '/users',
    component: ViewUsers,
    name: 'users',
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const storeAuth = useStoreAuth();
  if (!storeAuth.user.id && to.name !== 'auth') {
    return {
      name: 'auth',
    };
  }

  if (storeAuth.user.id && to.name === 'auth') {
    return false;
  }
});

export default router;