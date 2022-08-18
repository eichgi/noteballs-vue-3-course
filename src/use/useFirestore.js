import {addDoc, deleteDoc, doc, getDocs, query, updateDoc} from "firebase/firestore";

export async function deleteFirestoreCollection(ref) {
  const records = [];

  const querySnapshot = await getDocs(query(ref));
  querySnapshot.forEach( (doc) => {
    records.push(doc);
  });

  for (let record of records) {
    await deleteDoc(doc(ref, record.id));
  }
}

export async function getFirestoreCollection(query) {
  const records = [];

  const querySnapshot = await getDocs(query);
  querySnapshot.forEach(doc => {
    records.push(doc.data());
  });

  return records;
}

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