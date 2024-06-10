const connection = require('../dbConnection/connection')
const db = connection.collection('dates')

class DateRepository {
    async addDate(userName, dateData) {
        try {
          const newDate = {
            userName: userName,
            ...dateData,
            
          };

          const docRef = await db.add(newDate);
          console.log('Document written with ID: ', docRef.id);
          return docRef.id;
        } catch (error) {
          console.error('Error adding document: ', error);
          throw error;
        }
      }
    
      
      
};
    
    


module.exports = new DateRepository();