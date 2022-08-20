const functions = require("firebase-functions");
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
const {sendEmailToNewUser} = require("./use/useUserFunctions");
const {createCollection, deleteCollection, getCollection} = require("./use/useFirestore");
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

/**
 * data property must be defined in the json response as shown here,
 * otherwise an error is going to be launched.
 */
exports.helloWorld = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    //functions.logger.info("Hello logs!", {structuredData: true});
    response.json({data: {message: 'Hello from Noteballs!', date: new Date().toDateString()}});
  });
});

/**
 * data contains the values send from the call
 * response
 */
exports.test = functions.https.onCall((data, context) => {
  const {uid, token: {email}} = context.auth;
  functions.logger.info(data.text, {structuredData: true});
  functions.logger.info(context.auth, {structuredData: true});

  return {
    message: "Test endpoint reached successfully!",
    date: new Date().toDateString(),
    auth: {uid: uid, email: email},
  };
});

exports.sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
  await sendEmailToNewUser(user)
});

/**
 * Functions for testing purposes only
 */
/*exports.scheduledFunction = functions.pubsub.schedule('* * * * *')
  .onRun((context) => {
    functions.logger.info('This message will be logged every minute.');
    console.log('This message will be logged every minute.');
    return null;
  });*/

exports.createCollection = functions.https.onCall(createCollection);

exports.deleteCollection = functions.https.onCall(deleteCollection);

exports.getCollection = functions.https.onCall(getCollection);
