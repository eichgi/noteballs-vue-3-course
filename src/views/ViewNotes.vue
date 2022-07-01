<template>
  <div class="notes">

    <div class="card has-background-success-dark p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea class="textarea" placeholder="Add a New Note" v-model="newNote"
                    ref="newNoteRef"/>
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button class="button is-link has-background-success"
                  @click="addNote" :disabled="!newNote">Add New Note
          </button>
        </div>
      </div>
    </div>

    <Note v-for="note in notes" :key="note.id" :note="note" @deleteClicked="deleteNote"/>

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

const newNote = ref('');
const newNoteRef = ref(null);
const notes = ref([
  {
    id: '1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias ducimus eum ipsum laboriosam omnis optio\n' +
        '          quisquam quos ratione reiciendis tenetur? Doloribus earum minus repudiandae sunt voluptatem. Accusantium\n' +
        '          deleniti dolores facilis?',

  },
  {
    id: '2',
    content: 'Shorter note',

  }
]);

const addNote = () => {
  notes.value.unshift({id: new Date().getTime().toString(), content: newNote.value});
  newNote.value = "";
  newNoteRef.value.focus();
}

const deleteNote = (idToDelete) => {
  console.log('delete note');
  notes.value = notes.value.filter(note => note.id !== idToDelete);
};
</script>

<style scoped>

</style>