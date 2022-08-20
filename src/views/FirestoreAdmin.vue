<template>
  <h1 class="is-size-1">Firestore Playground</h1>
  <br>
  <div class="notification is-warning">
    <strong>Firebase Actions</strong> are functions that executes the firebase sdk for web.
  </div>

  <div class="card">
    <div class="card-header">
      <div class="card-header-title">
        Firestore Actions
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
  <br>
  <div class="notification is-warning">
    <strong>Cloud Functions</strong> are firestore functions executed through the functions api.
  </div>
  <div class="card">
    <div class="card-header">
      <div class="card-header-title">
        Cloud Functions
      </div>
    </div>
    <div class="card-content">
      <div class="columns">
        <div class="column is-fullwidth">
          <div class="field">
            <div class="label">Model to seed</div>
            <div class="control">
              <input v-model="model" class="input" type="text" placeholder="Enter the name of the model">
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-half">
          <button class="button is-primary my-1" @click="createCollection">Create collection</button>
          <br>
          <button class="button is-link my-2" @click="getCollection">Get collection</button>
          <br>
          <button class="button is-danger my-1" @click="deleteCollection">Delete collection</button>&nbsp;
        </div>
        <div class="column is-half">
          <p>Response:</p>
          <pre>{{ functionResponse }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {db, functions} from "../js/firebase";
import {collection, query} from "firebase/firestore";
import {useStoreAuth} from "../stores/storeAuth";
import {addFirestoreDoc, deleteFirestoreCollection, getFirestoreCollection} from "../use/useFirestore";
import {httpsCallable} from "firebase/functions";

const storeAuth = useStoreAuth();
const model = ref("devices");
const modelItems = ref([]);
const functionResponse = ref({});

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

const onCallFunction = async () => {
  const testFn = httpsCallable(functions, 'test');

  try {
    const response = await testFn({text: 'lorem ipsum...', value: 100});
    functionResponse.value = response;
  } catch (error) {
    console.log("ERROR", error, error.code);
  }
};

const createCollection = async () => {
  const request = httpsCallable(functions, 'createCollection');

  try {
    const response = await request({collectionName: model.value});
    functionResponse.value = response;
  } catch (error) {
    console.log("ERROR", error, error.code);
  }

};

const getCollection = async () => {
  const onCall = httpsCallable(functions, 'getCollection');

  try {
    const response = await onCall({collectionName: model.value});
    functionResponse.value = response;
  } catch (error) {
    console.log("ERROR", error, error.code);
  }
};

const deleteCollection = async () => {
  const onCall = httpsCallable(functions, 'deleteCollection');

  try {
    const response = await onCall({collectionName: model.value});
    functionResponse.value = response;
  } catch (error) {
    console.log("ERROR", error, error.code);
  }
};
</script>