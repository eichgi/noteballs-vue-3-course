<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        My profile
      </p>
      <button class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
      </button>
    </header>
    <div class="card-content">
      <div class="content">
        <div class="field">
          <label>UID</label>
          <input class="input" type="text" :value="user.uid" disabled>
        </div>

        <div class="field"><label>Email</label>
          <input class="input" type="text" :value="user.email" disabled>
        </div>

        <div class="field"><label>Name</label>
          <input class="input" type="text" v-model="displayName">
        </div>

        <div class="field"><label>Photo</label>
          <input class="input" type="text" v-model="photoURL">
        </div>

        <div class="buttons">
          <button class="button is-warning mt-5" @click="becomeAdmin">Become Admin</button>
          <button class="button is-primary mt-5" @click="updateProfile">Update profile</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStoreAuth} from "../stores/storeAuth";
import {ref} from "vue";

const storeAuth = useStoreAuth();
const user = storeAuth.authenticatedUser;
console.log("USER: ", user);

const becomeAdmin = async () => {
  try {
    let response = await fetch(`${import.meta.env.VITE_BASE_URL}/becomeAdmin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({uid: user.uid}),
    });

    response = await response.json();

    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

const displayName = ref(user.displayName);
const photoURL = ref(user.photoURL);

const updateProfile = async () => {
  const data = {
    idToken: user.accessToken,
    displayName: displayName.value,
    photoURL: photoURL.value ?? '',
  };

  await storeAuth.updateUserProfile(data);
};

const updateProfileRestApi = async () => {
  const data = {
    idToken: user.accessToken,
    displayName: displayName.value,
    photoURL: photoURL.value ?? '',
  };
  console.log(data);

  try {
    let response = await fetch(`${import.meta.env.VITE_GOOGLE_REST_API_URL}/accounts:update?key=${import.meta.env.VITE_GOOGLE_REST_API_KEY}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    response = await response.json();

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>

</style>