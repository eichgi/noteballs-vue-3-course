<template>
  <div class="stats">
    <table class="table">
      <thead>
      <tr>
        <th>Stat</th>
        <th>Value</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Number of Notes</td>
        <td>{{ storeNotes.totalNotesCount }}</td>
      </tr>
      <tr>
        <td>Number of Characters</td>
        <td>{{ storeNotes.totalCharactersCount }}</td>
      </tr>
      </tbody>
    </table>

    <input v-model="loveNoteballs" type="text" placeholder="Do you love noteballs?" class="input" v-autofocus>
  </div>
</template>

<script setup>
import {useStoreNotes} from "../stores/storeNote";
import {vAutofocus} from "../directives/vAutofocus";
import {useWatchCharacters} from "../use/useWatchCharcaters";
import {ref} from "vue";

const storeNotes = useStoreNotes();

const loveNoteballs = ref('');
useWatchCharacters(loveNoteballs, 15);
</script>

<style scoped>

</style>