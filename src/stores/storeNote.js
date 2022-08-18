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
  getDoc
} from 'firebase/firestore';
import {addFirestoreDoc, deleteFirestoreDoc, updateFirestoreDoc} from "../use/useFirestore";

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
      notesColectionQuery = query(notesCollectionRef, orderBy('createdAt', 'desc'));
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
            createdAt: doc.data().createdAt,
            updatedAt: doc.data().updatedAt,
            image: doc.data().image ?? null,
          });
        });
        this.notes = notes;
        this.notesLoaded = true;
      }, (error) => {
        alert(error.message);
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
      const data = {
        content: note.content,
        image: note.image,
      };
      //await addDoc(notesCollectionRef, data);
      await addFirestoreDoc(notesCollectionRef, data);
    },
    async deleteNote(noteId) {
      //this.notes = this.notes.filter(note => note.id !== noteId);
      //await deleteDoc(doc(notesCollectionRef, noteId));
      await deleteFirestoreDoc(notesCollectionRef, noteId);
    },
    async updateNote(id, note) {
      const data = {
        content: note.content,
        image: note.image,
      };
      /*await updateDoc(doc(notesCollectionRef, id), data);*/
      await updateFirestoreDoc(notesCollectionRef, id, data);
      await this.getNotes();
    },
    // API methods
    async addNoteWithImage(payload) {
      const storeAuth = useStoreAuth();

      let response = await fetch('/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${storeAuth.user.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      response = await response.json();
    }
  },
  getters: {
    getNote: (state) => {
      return (id) => {
        return state.notes.filter(note => note.id === id)[0];
      }
    },
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