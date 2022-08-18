<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Users
      </p>
      <button class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
      </button>
    </header>
    <div class="card-content">
      <div class="content">
        <div class="list">
          <table class="table">
            <thead>
            <tr>
              <th>UID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(user, index) in users" :key="index">
              <td>{{ user.id }}</td>
              <td>{{ user.displayName ? user.displayName : 'Undefined Name' }}</td>
              <td>{{user.email}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {useStoreAuth} from "../stores/storeAuth";
import {useStoreUsers} from "../stores/storeUsers";
import {getUsers} from "../use/useUsers";

const storeAuth = useStoreAuth();
const storeUsers = useStoreUsers();
let users = ref([]);

const getUsersFromRestApi = async () => {
  try {
    let response = await fetch(`${import.meta.env.VITE_BASE_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${storeAuth.user.accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    const status = response.status;
    response = await response.json();
    console.log(response);
    if (status !== 200) {
      alert(response.message);
    } else {
      users.value = response.users;
    }
  } catch (error) {
    console.log(error);
  }
};

const getUsersFromFirebase = async () => {
  const response = await getUsers();
  await storeUsers.$patch({
    users: users,
  });
  users.value = response;
}

onMounted(() => {
  const storedUsers = storeUsers.loadUsers;

  if (!storedUsers.length) {
    getUsersFromFirebase();
  } else {
    users.value = storedUsers;
  }
});
</script>

<style scoped>

</style>