<template>
  <div class="notes">

    <AddEditNote v-model="newNote" ref="addEditNoteRef" placeholder="Add a New Note">
      <template #uploads>
        <label class="has-text-white">
          Upload file
          <input class="input" type="file" ref="inputFile" required/>
        </label>
      </template>

      <template #buttons>
        <button class="button is-link has-background-success mt-5"
                @click="addNoteWithImage" :disabled="!newNote">Add New Note
        </button>
      </template>
    </AddEditNote>

    <progress
        v-if="!storeNotes.notesLoaded"
        class="progress is-large is-success" max="100"/>

    <template v-else>
      <div class="columns is-desktop is-multiline">
        <Note v-for="note in storeNotes.notes"
              class="column is-6"
              :key="note.id"
              :note="note"
              @deleteClicked="deleteNote"/>
      </div>

      <div v-if="!storeNotes.notes.length"
           class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6">
        No notes here yet
      </div>
    </template>

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
import {getStorage, ref as fbRef, uploadBytes} from 'firebase/storage';
import {uploadFirebaseObject} from "../use/useFirebaseStorage";

const storage = getStorage();
const storeNotes = useStoreNotes();

const newNote = ref('');
const addEditNoteRef = ref(null);
const inputFile = ref(null);

const addNote = (image = null) => {
  storeNotes.addNote({
    content: newNote.value,
    image,
  });
  newNote.value = "";
  inputFile.value = "";
  addEditNoteRef.value.focusTextArea();
}

const addNoteWithImage = async () => {
  const uploadFileResponse = await uploadFirebaseObject(inputFile.value.files[0]);
  console.log(uploadFileResponse);
  if (uploadFileResponse) {
    addNote(uploadFileResponse.metadata);
  }
};

const deleteNote = (idToDelete) => {
  storeNotes.deleteNote(idToDelete);
};

useWatchCharacters(newNote);

</script>

<style scoped>

</style>