<template>
  <div class="card mb-4">
    <div class="card-image" v-if="imageURL">
      <figure class="image is-4by3">
        <img :src="imageURL" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="content">
        {{ note.content }}
      </div>
      <div class="columns is-mobile has-text-grey-light mt-2">
        <small class="column">{{ dateFormatted }}</small>
        <small class="column has-text-right">{{ characterLength }}</small>
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
        :note="note"
        v-if="modals.deleteNote"
        v-model="modals.deleteNote"/>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref as vueRef} from 'vue';
import {useStoreNotes} from "../../stores/storeNote";
import ModalDeleteNote from "./ModalDeleteNote.vue";
import {useDateFormat} from '@vueuse/core';
import {getObjectUrl} from "../../use/useFirebaseStorage";

const storeNotes = useStoreNotes();
const props = defineProps({
  note: {
    type: Object,
    required: true,
  }
});

const dateFormatted = computed(() => {
  let date = new Date(props.note.createdAt);
  date = useDateFormat(date, 'DD-MM-YYYY');
  return date.value;
});

const characterLength = computed(() => {
  let description = props.note.content.length > 1 ? 'characters' : 'character';
  return `${props.note.content.length} ${description}`;
});

const modals = reactive({
  deleteNote: false,
  editNote: false,
});
let imageURL = vueRef('')

const deleteNote = () => {
  modals.deleteNote = true;
};

onMounted(async () => {
  if (props.note.image) {
    imageURL.value = await getObjectUrl(props.note.image.fullPath);
  }
});
</script>

<style scoped>

</style>