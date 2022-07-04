<template>
  <div class="edit-note">
    <AddEditNote ref="addEditNoteRef"
                 v-model="noteContent"
                 bgColor="link"
                 placeholder="Edit Note"
                 label="Edit Note"
    >
      <template #buttons>
        <router-link to="/" class="button is-link is-light mr-2">Cancel</router-link>
        <button class="button is-link has-background-link" :disabled="!noteContent"
                @click="handleSaveClicked">Save Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>

import AddEditNote from "../components/Notes/AddEditNote.vue";
import {ref} from "vue";
import {useRoute, useRouter} from 'vue-router';
import {useStoreNotes} from "../stores/storeNote";

const storeNotes = useStoreNotes();
const route = useRoute();
const router = useRouter();

const noteContent = ref('');
noteContent.value = storeNotes.getNoteContent(route.params.id);

const handleSaveClicked = () => {
  storeNotes.updateNote(route.params.id, noteContent.value);
  router.push('/');
};
</script>

<style scoped>

</style>