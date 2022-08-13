import {collection, getDocs} from "firebase/firestore";
import {db} from "../js/firebase";

const usersRef = collection(db, 'users');

export async function getUsers() {
  const users = [];
  const querySnapshot = await getDocs(usersRef);
  querySnapshot.forEach(doc => {
    users.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return users;
}