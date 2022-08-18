<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalCardRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this note?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button class="button" @click="closeModal">Cancel</button>
        <button class="button is-danger" @click="deleteNote">Delete</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import {onClickOutside} from '@vueuse/core';
import {onMounted, onUnmounted, ref} from "vue";
import {useStoreNotes} from "../../stores/storeNote";
import {deleteFirebaseObject} from "../../use/useFirebaseStorage";

const storeNotes = useStoreNotes();

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  note: {
    type: Object,
    required: true,
  }
});

const emit = defineEmits(['update:modelValue']);

const closeModal = () => {
  emit('update:modelValue', false);
};

const deleteNote = async () => {
  if (props.note.image) {
    await deleteFirebaseObject(props.note.image.fullPath);
  }

  storeNotes.deleteNote(props.note.id);
}

const modalCardRef = ref(null);

onClickOutside(modalCardRef, () => {
  closeModal();
})

const handleKeyboard = (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
};

onMounted(() => {
  document.addEventListener('keyup', handleKeyboard);
});

onUnmounted(() => {
  document.removeEventListener('keyup', handleKeyboard);
});

</script>

<style scoped>

</style>