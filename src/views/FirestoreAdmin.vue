<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-title">
        Firestore Admin
      </div>
    </div>
    <div class="card-content">
      <div class="columns">
        <div class="column is-half">
          <div class="field">
            <div class="label">Model to seed</div>
            <div class="control">
              <input v-model="model" class="input" type="text" placeholder="Enter the name of the model">
            </div>
          </div>
          <button class="button is-primary" @click="runSeeder">Seed</button>&nbsp;
          <button class="button is-link" @click="getSeededData">Get seeded model</button>&nbsp;
          <button class="button is-danger" @click="deleteSeededData">Delete seeded data</button>
        </div>
        <div class="column is-half">
          <table class="table is-fullwidth">
            <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(record, index) in modelItems" :key="index">
              <td>{{ record.name }}</td>
              <td>{{ record.age }}</td>
            </tr>
            <tr v-if="!modelItems.length">
              <td colspan="2">There are no records</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {db} from "../js/firebase";
import {collection, query} from "firebase/firestore";
import {useStoreAuth} from "../stores/storeAuth";
import {addFirestoreDoc, deleteFirestoreCollection, getFirestoreCollection} from "../use/useFirestore";

const storeAuth = useStoreAuth();
const model = ref("devices");
const modelItems = ref([]);

const runSeeder = async () => {
  const models = createModels();
  const modelCollectionRef = collection(db, 'users', storeAuth.user.id, model.value);
  for (let model of models) {
    await addFirestoreDoc(modelCollectionRef, model);
  }
};

const getSeededData = async () => {
  if (!model.value) {
    return false;
  }

  const modelCollectionRef = collection(db, 'users', storeAuth.user.id, model.value);
  const q = query(modelCollectionRef);
  const records = await getFirestoreCollection(q);

  modelItems.value = records;
};

const createModels = () => {
  const values = [];

  for (let i = 0; i < 1; i++) {
    values.push({
      name: (Math.random() + 1).toString(36).substring(3),
      age: Math.floor((Math.random() * 50) + 8),
    });
  }

  return values;
};

const deleteSeededData = async () => {
  const modelCollectionRef = collection(db, 'users', storeAuth.user.id, model.value);
  await deleteFirestoreCollection(modelCollectionRef);
  await getSeededData();
};
</script>