<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
      </div>
      <div class="has-text-right has-text-grey-light mt-2">
        <small>{{ characterLength }}</small>
      </div>
    </div>
    <footer class="card-footer">
      <router-link :to="`/editNote/${note.id}`" class="card-footer-item">Edit</router-link>
      <!--         @click.prevent="storeNotes.deleteNote(note.id)"-->
      <a href="#" class="card-footer-item"
         @click.prevent="deleteNote"
      >Delete</a>
    </footer>
    <ModalDeleteNote
        :noteId="note.id"
        v-if="modals.deleteNote"
        v-model="modals.deleteNote"/>
  </div>
</template>

<script setup>
import {computed, reactive} from 'vue';
import {useStoreNotes} from "../../stores/storeNote";
import ModalDeleteNote from "./ModalDeleteNote.vue";

const storeNotes = useStoreNotes();
const props = defineProps({
  note: {
    type: Object,
    required: true,
  }
});

const characterLength = computed(() => {
  let description = props.note.content.length > 1 ? 'characters' : 'character';
  return `${props.note.content.length} ${description}`;
});

const modals = reactive({
  deleteNote: false,
  editNote: false,
});

const deleteNote = () => {
  modals.deleteNote = true;
};
</script>

<style scoped>

</style>