import {defineStore} from "pinia";
import {db} from '@/js/firebase';
import {
  collection,
  getDocs,
  onSnapshot,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  addDoc,
} from 'firebase/firestore';

const notesCollectionRef = collection(db, 'notes');
const notesColectionQuery = query(notesCollectionRef, orderBy('date', 'desc'));

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notesLoaded: false,
      notes: [/*{
        id: '1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias ducimus eum ipsum laboriosam omnis optio\n' +
          '          quisquam quos ratione reiciendis tenetur? Doloribus earum minus repudiandae sunt voluptatem. Accusantium\n' +
          '          deleniti dolores facilis?',

      },
        {
          id: '2',
          content: 'Shorter note updated x2',

        }*/],
    }
  },
  actions: {
    async getNotes() {
      this.notesLoaded = false;
      onSnapshot(notesColectionQuery, (querySnapshot) => {
        let notes = [];
        querySnapshot.forEach(doc => {
          notes.push({
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date,
          });
        });
        this.notes = notes;
        this.notesLoaded = true;
      });
    },
    async addNote(note) {
      //this.notes.push(note);
      await addDoc(notesCollectionRef, {
        content: note.content,
        date: new Date().getTime().toString(),
      });
    },
    async deleteNote(noteId) {
      //this.notes = this.notes.filter(note => note.id !== noteId);
      await deleteDoc(doc(notesCollectionRef, noteId));
    },
    async updateNote(id, content) {
      /*const index = this.notes.findIndex(note => note.id === id);
      this.notes[index].content = content;*/
      await updateDoc(doc(notesCollectionRef, id), {
        content
      })
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