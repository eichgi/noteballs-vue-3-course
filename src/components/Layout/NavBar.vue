<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">

    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <div class="navbar-item is-size-4 is-family-monospace">Noteballs {{appVersion}}</div>

        <a role="button" class="navbar-burger" :class="{'is-active' : showMobileNav}"
           @click.prevent="showMobileNav=!showMobileNav" aria-label="menu"
           aria-expanded="false" data-target="navbarBasicExample" ref="navbarBurgerRef">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active' : showMobileNav}" ref="navbarMenuRef">
        <div class="navbar-start">
          <button v-if="storeAuth.user.id"
                  class="button is-small is-info mt-3 ml-3" @click="logout">Logout {{storeAuth.user.email}}
          </button>
        </div>
        <div class="navbar-end">
          <router-link class="navbar-item" active-class="is-active" to="/"
                       @click="showMobileNav = false;">Notes
          </router-link>
          <router-link class="navbar-item" active-class="is-active" to="/firestore"
                       @click="showMobileNav = false;">Firestore
          </router-link>
          <router-link class="navbar-item" active-class="is-active" to="/stats"
                       @click="showMobileNav = false;">Stats
          </router-link>
          <router-link class="navbar-item" active-class="is-active" to="/profile"
                       @click="showMobileNav = false;">Profile
          </router-link>
          <router-link class="navbar-item" active-class="is-active" to="/users"
                       @click="showMobileNav = false;">Users
          </router-link>
        </div>
      </div>
    </div>

  </nav>
</template>

<script setup>
import {ref} from "vue";
import {onClickOutside} from '@vueuse/core';
import {useStoreAuth} from "../../stores/storeAuth";

const appVersion = import.meta.env.VITE_APP_VERSION;
const storeAuth = useStoreAuth();
const showMobileNav = ref(false);
const navbarMenuRef = ref(null);
const navbarBurgerRef = ref(null);

onClickOutside(navbarMenuRef, (event) => {
  showMobileNav.value = false;
}, {
  ignore: [navbarBurgerRef]
})

const logout = () => {
  storeAuth.logout();
  showMobileNav.value = false;
}

</script>

<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>