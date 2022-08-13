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
      console.log("The user has been created with the following ID: ", docRef.id);
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
      console.log("USERS: ", users);
    }
  },
  getters: {
    loadUsers: (state) => {
      console.log(state);
      return state.users;
    }
  }
});