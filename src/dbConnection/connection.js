const admin = require('firebase-admin');

const serviceAccount = require('../../config/serviceAccountKey.json'); 
require('dotenv').config();
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY))
});

module.exports =   connection = admin.firestore();