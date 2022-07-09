import {defineStore} from "pinia";
import {db} from '@/js/firebase';
import {useStoreAuth} from "./storeAuth";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  addDoc,
} from 'firebase/firestore';

let notesCollectionRef, notesColectionQuery;
let getNotesSnapshot = null;

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notesLoaded: false,
      notes: [],
    }
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth();

      notesCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes');
      notesColectionQuery = query(notesCollectionRef, orderBy('date', 'desc'));
      this.getNotes();
    },
    async getNotes() {
      this.notesLoaded = false;

      if (getNotesSnapshot) {
        getNotesSnapshot(); //unsubscribe from any active listener
      }

      getNotesSnapshot = onSnapshot(notesColectionQuery, (querySnapshot) => {
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
    clearNotes() {
      this.notes = [];
      if (getNotesSnapshot) {
        getNotesSnapshot();
      }
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