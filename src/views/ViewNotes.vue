<template>
  <div class="notes">

    <AddEditNote v-model="newNote" ref="addEditNoteRef" placeholder="Add a New Note">
      <template #buttons>
        <button class="button is-link has-background-success"
                @click="addNote" :disabled="!newNote">Add New Note
        </button>
      </template>
    </AddEditNote>

    <Note v-for="note in storeNotes.notes" :key="note.id" :note="note" @deleteClicked="deleteNote"/>

    <!--    <div class="card mb-4" v-for="note in notes" :key="note.id">
          <div class="card-content">
            <div class="content">
              {{ note.content }}
            </div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item">Edit</a>
            <a href="#" class="card-footer-item">Delete</a>
          </footer>
        </div>-->
  </div>
</template>

<script setup>
import {ref} from "vue";
import Note from "../components/Notes/Note.vue";
import AddEditNote from "../components/Notes/AddEditNote.vue";
import {useStoreNotes} from "../stores/storeNote";
import {useWatchCharacters} from "../use/useWatchCharcaters";

const storeNotes = useStoreNotes();

const newNote = ref('');
const addEditNoteRef = ref(null);

const addNote = () => {
  storeNotes.addNote({id: new Date().getTime().toString(), content: newNote.value});
  newNote.value = "";
  addEditNoteRef.value.focusTextArea();
}

const deleteNote = (idToDelete) => {
  storeNotes.deleteNote(idToDelete);
};

useWatchCharacters(newNote);
</script>

<style scoped>

</style>