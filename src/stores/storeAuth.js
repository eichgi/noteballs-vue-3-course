import {defineStore} from "pinia";
import {updateProfile} from 'firebase/auth';
import {auth, db} from "../js/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {useStoreNotes} from "./storeNote";
import {useStoreUsers} from "./storeUsers";
import {doc, updateDoc} from "firebase/firestore";

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {},
    };
  },
  getters: {
    authenticatedUser(state) {
      return state.user;
    }
  },
  actions: {
    init() {
      const storeNotes = useStoreNotes();

      onAuthStateChanged(auth, (user) => {
        console.log("onAuthStateChanged");
        if (user) {
          console.log("USER: ", user);
          user.getIdTokenResult()
            .then(tokenResult => console.log("GET ID TOKEN RESULT: ", tokenResult.claims));
          this.user = user;
          this.user.id = user.uid;
          this.user.email = user.email;
          this.router.push('/');
          storeNotes.init();
        } else {
          this.user = {};
          this.router.replace('/auth');
          storeNotes.clearNotes();
        }
      });
    },
    signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then(res => {
          const credential = GoogleAuthProvider.credentialFromResult(res);
          const token = credential.accessToken;
          const user = res.user;
          console.log(user, token);
        }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode, errorMessage, email, credential);
      });
    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    },
    registerUser(credentials) {
      console.log(credentials);
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("REGISTERED USER: ", user);
          useStoreUsers().createUser({
            id: user.uid,
            displayName: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    },
    logout() {
      signOut(auth)
        .then(() => {
          console.log('signed out...');
        })
        .catch(error => console.log(error))
    },
    async updateUserProfile(data) {
      try {
        await updateProfile(auth.currentUser, data); // No response when successful
        await this.updateDatabaseUser(data);
      } catch (error) {
        console.log(error);
      }
    },
    async updateDatabaseUser(data) {
      try {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        // No response when successful
        await updateDoc(userRef, {
          displayName: data.displayName,
          photoURL: data.photoURL,
        });
      } catch (error) {
        console.log(error);
      }
    },
  }
});