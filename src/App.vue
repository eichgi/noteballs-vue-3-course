<template>
  <!--  <router-link to="/" class="button">Notes</router-link>
    |
    <router-link to="/stats" class="button">Stats</router-link>-->
  <NavBar/>

  <div class="container is-max-desktop px-2 py-4">
    <router-view/>
  </div>

</template>

<style>
@import 'bulma/css/bulma.min.css';
</style>

<script setup>
import NavBar from '@/components/Layout/NavBar.vue';
</script>