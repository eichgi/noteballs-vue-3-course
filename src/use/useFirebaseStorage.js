import {deleteObject, getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

export async function uploadFirebaseObject(file) {
  const fileName = Date.now();
  const storageRef = ref(getStorage(), '/notes/' + fileName);
  try {
    const response = await uploadBytes(storageRef, file);
    return {
      metadata: response.metadata,
    }
  } catch (error) {
    return false;
  }
}

export async function getObjectUrl(fullPath) {
  return await getDownloadURL(ref(getStorage(), fullPath));
}

export async function deleteFirebaseObject(fullPath) {
  const desertRef = ref(getStorage(), fullPath);
  try {
    await deleteObject(desertRef);
  } catch (error) {
    console.log(error);
  }

  return true;
}