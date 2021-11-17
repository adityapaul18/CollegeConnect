var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://collegeconnect-381a2.appspot.com"
});

const bucket = admin.storage().bucket();
const auth = admin.auth();
const messaging = admin.messaging();

module.exports={auth,bucket,messaging};
