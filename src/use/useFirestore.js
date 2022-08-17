import {addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore";

export async function addFirestoreDoc(ref, data) {
  const wrapper = {
    ...data,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  await addDoc(ref, wrapper);
}

export async function updateFirestoreDoc(ref, docId, data) {
  const wrapper = {
    ...data,
    updatedAt: Date.now(),
  };

  //wrapping reference and doc id with doc() helper
  await updateDoc(doc(ref, docId), wrapper);
}

export async function deleteFirestoreDoc(ref, docId) {
  //wrapping reference and doc id with doc() helper
  await deleteDoc(doc(ref, docId));
}