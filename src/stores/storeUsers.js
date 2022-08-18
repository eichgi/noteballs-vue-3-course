import {defineStore} from "pinia";
import {doc, setDoc, collection, getDocs} from "firebase/firestore";
import {db} from "../js/firebase";

const usersRef = collection(db, 'users');

export const useStoreUsers = defineStore('storeUsers', {
  state: () => {
    return {
      users: [],
    }
  },
  actions: {
    async createUser(user) {
      const docRef = await setDoc(doc(db, 'users', user.id), user);
    },
    async getUsers() {
      const users = [];
      const querySnapshot = await getDocs(usersRef);
      querySnapshot.forEach(doc => {
        users.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    }
  },
  getters: {
    loadUsers: (state) => {
      return state.users;
    }
  }
});