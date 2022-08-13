<template>
  <div class="edit-note">
    <AddEditNote ref="addEditNoteRef"
                 v-model="noteContent"
                 bgColor="link"
                 placeholder="Edit Note"
                 label="Edit Note">
      <template #uploads>
        <label class="has-text-white">
          Upload file
          <input class="input" type="file" ref="inputFile" required/>
        </label>
      </template>
      <template #buttons>
        <div class="mt-5">
          <router-link to="/" class="button is-link is-light mr-2">Cancel</router-link>
          <button class="button is-link has-background-link" :disabled="!noteContent"
                  @click="addNoteWithImage">Save Changes
          </button>
        </div>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>

import AddEditNote from "../components/Notes/AddEditNote.vue";
import {reactive, ref} from "vue";
import {useRoute, useRouter} from 'vue-router';
import {useStoreNotes} from "../stores/storeNote";
import {deleteFirebaseObject, uploadFirebaseObject} from "../use/useFirebaseStorage";

const storeNotes = useStoreNotes();
const route = useRoute();
const router = useRouter();

const note = ref({});
const noteContent = ref('');
const inputFile = ref(null);
noteContent.value = storeNotes.getNoteContent(route.params.id);
note.value = storeNotes.getNote(route.params.id);

const updateNote = (image = null) => {
  storeNotes.updateNote(route.params.id, {
    content: noteContent.value,
    image: image ?? note.image,
  });
  router.push('/');
};

const addNoteWithImage = async () => {
  //console.log("note", note, note.value.image);
  const file = inputFile.value.files[0];
  if (!file) {
    updateNote();
  } else {
    await deleteFirebaseObject(note.value.image.fullPath);
    const uploadFileResponse = await uploadFirebaseObject(file);
    console.log(uploadFileResponse);
    if (uploadFileResponse) {
      updateNote(uploadFileResponse.metadata);
    }
  }
};
</script>

<style scoped>

</style>