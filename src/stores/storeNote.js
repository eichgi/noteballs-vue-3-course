import {defineStore} from "pinia";

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [{
        id: '1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias ducimus eum ipsum laboriosam omnis optio\n' +
          '          quisquam quos ratione reiciendis tenetur? Doloribus earum minus repudiandae sunt voluptatem. Accusantium\n' +
          '          deleniti dolores facilis?',

      },
        {
          id: '2',
          content: 'Shorter note updated x2',

        }],
    }
  },
  actions: {
    addNote(note) {
      this.notes.push(note);
    },
    deleteNote(noteId) {
      this.notes = this.notes.filter(note => note.id !== noteId);
    },
    updateNote(id, content) {
      const index = this.notes.findIndex(note => note.id === id);
      this.notes[index].content = content;
    },
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter(note => note.id === id)[0].content;
      }
    },
    totalNotesCount: (state) => {
      return state.notes.length;
    },
    totalCharactersCount: (state) => {
      let count = 0;

      state.notes.forEach(note => {
        count += note.content.length;
      });

      return count;
    },
  }
});