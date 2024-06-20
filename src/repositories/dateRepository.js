const connection = require('../dbConnection/connection')
const db = connection.collection('dates')
const {FieldValue } = require('firebase-admin/firestore');
class DateRepository {
    async addDate(day, userId) {
        try {
          const snapshot = await db.where('user', '==', userId).get();

          if (snapshot.empty) {
            console.log('No matching documents.');
            db.add({
              user: userId,
              dates: FieldValue.arrayUnion(day)
            })
          } else {
            const doc = snapshot.docs[0]; // Asumiendo que solo hay un documento
            await doc.ref.set({
              user: userId,
              dates: FieldValue.arrayUnion(day)
            }, { merge: true });

          console.log('Document updated successfully.');
        }
          
          return snapshot.id;
        } catch (error) {
          console.error('Error adding document: ', error);
          throw error;
        }
      }
    
      
      
};
    
    


module.exports = new DateRepository();