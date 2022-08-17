const functions = require("firebase-functions");

const admin = require('firebase-admin');
const {sendEmailToNewUser} = require("./use/useUserFunctions");
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Noteballs!");
});

exports.sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
  await sendEmailToNewUser(user)
});
