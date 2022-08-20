const admin = require('firebase-admin');

exports.getCollection = async (data, context) => {
  const {uid} = context.auth;
  const {collectionName} = data;

  const itemsRef = await admin.firestore().collection('users/' + uid + '/' + collectionName);
  let items = [];
  const snapshot = await itemsRef.get();
  snapshot.forEach(doc => {
    items.push(doc.data());
  });

  return {
    items: items,
  };
};

exports.deleteCollection = async (data, context) => {
  const {uid} = context.auth;
  const {collectionName} = data;
  const path = 'users/' + uid + '/' + collectionName;

  try {
    const collectionRef = admin.firestore().collection(path);
    console.log(collectionRef.path);
    await admin.firestore().recursiveDelete(collectionRef);
  } catch (error) {
    console.log(error);
  }

  return {
    message: 'The process is completed',
  };
};

exports.createCollection = async (data, context) => {
  const {uid} = context.auth;
  const {collectionName} = data;

  const entries = createModels();
  for (const entry of entries) {
    const record = admin.firestore()
      .collection('users')
      .doc(uid)
      .collection(collectionName)
      .doc();
    await record.set(entry);
  }

  return {message: 'test successful!', date: new Date().toTimeString()};
};

const createModels = () => {
  const values = [];

  for (let i = 0; i < 5; i++) {
    values.push({
      name: (Math.random() + 1).toString(36).substring(3),
      age: Math.floor((Math.random() * 50) + 8),
    });
  }

  return values;
};