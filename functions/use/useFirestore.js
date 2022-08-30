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
    //console.log(collectionRef.path);
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

exports.showDataTable = async (data, context) => {
  const {uid} = context.auth;
  const {filters} = data;
  const records = [];

  const path = 'users/' + uid + '/datatable';

  const collectionRef = admin.firestore().collection(path);
  await admin.firestore().recursiveDelete(collectionRef);

  for (let i = 0; i < 15; i++) {
    records.push({
      name: (Math.random() + 1).toString(36).substring(3),
      age: Math.floor((Math.random() * 50) + 20),
      email: (Math.random() + 1).toString(36).substring(3) + "@noteballs.com",
      role: ['CEO', 'CTO', 'CFO', 'Engineer', 'Designer', 'Accountant', 'Clerk', 'Salesman', 'VP', 'Director', 'Outsourcing'][Math.floor(Math.random() * 11)],
      salary: Math.floor(Math.random() * 100000),
      active: Math.random() < 0.5,
      benefits: ['Parking Spot', 'Free Meal', 'WFH', 'Coupons'].sort(() => 0.5 - Math.random()).slice(0, Math.floor((Math.random() * 4) + 1)),
    });
  }

  for (const record of records) {
    const entry = admin.firestore()
      .collection('users')
      .doc(uid)
      .collection('datatable')
      .doc();
    await entry.set(record);
  }

  /**
   * It is important to filter before sorting by field:
   * where(salary...) -> orderBy(salary...)
   * You cannot add another set of where and orderBy (like below)
   * given the "Unhandled error Error: 3 INVALID_ARGUMENT: Cannot have inequality filters on multiple properties"
   * where(age...) -> orderBy(age...)
   */
  let itemsRef = admin.firestore().collection(path);
  if (filters.active) {
    console.log("only active employees")
    itemsRef = itemsRef.where('active', '==', true);
  }

  if (filters.salary) {
    console.log("salary sorting applied");
    //itemsRef = itemsRef.where('salary', '>', 50000) Optional where, it should be along an orderBy for the same field
    itemsRef = itemsRef.orderBy('salary', filters.salary);
  }

  if (filters.age) {
    console.log("age sorting applied");
    //itemsRef = itemsRef.where('age', '>', 50) Optional where, it should be along an orderBy for the same field
    itemsRef = itemsRef.orderBy('age', filters.age);
  }

  if(filters.benefits) {
    console.log("benefits filter applied");
    itemsRef = itemsRef.where('benefits', 'array-contains', filters.benefits);
  }

  itemsRef = itemsRef.limit(10);
  let items = [];
  const snapshot = await itemsRef.get();
  snapshot.forEach(doc => {
    items.push({...doc.data(), id: doc.id});
  });

  return {
    message: 'The table was successfully built',
    items: items,
  };
}