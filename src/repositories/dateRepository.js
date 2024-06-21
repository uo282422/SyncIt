const connection = require('../dbConnection/connection')
const db = connection.collection('dates')
const {FieldValue } = require('firebase-admin/firestore');
class DateRepository {
    async addDate(day, userId,userCol) {
        try {
          const snapshot = await db.where('user', '==', userId).get();

          if (snapshot.empty) {
            console.log('No matching documents.');
            db.add({
              user: userId,
              color: userCol,
              dates: FieldValue.arrayUnion(day)
            })
          } else {
            const doc = snapshot.docs[0]; // Asumiendo que solo hay un documento
            await doc.ref.set({
              user: userId,
              color: userCol,
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
      async getDatesByUser(userId){
        try{
          const querySnapshot = await db
          .where('user', '==', userId).get();
          if (querySnapshot.empty) {
            //console.log(`No se encontraron fechas para el usuario ${userId}`);
            return null;
          } else{
            
            let datesReturned = [];
            querySnapshot.forEach(doc => {
              datesReturned.push({ id: doc.id, ...doc.data() }); 
            });
            
            //console.log(`Dates de ${userId}: ` + datesReturned)
            return datesReturned;
          }
          
        
        } catch (error) {
          console.error('Error getting dates for user: '+ userId, error);
          throw error;
        }
      }
    
      
      
};
    
    


module.exports = new DateRepository();