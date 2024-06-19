const connection = require('../dbConnection/connection')
const db = connection.collection('users')

class UserRepository {
    async addUser(userName, userColor) {
        try {
          const newUser = {
            userName: userName,
            userColor: userColor,            
          };

          const docRef = await db.add(newUser );
          console.log('Creado with ID: ', docRef.id);
          
          const added = await db.doc(docRef.id).get();
          
          let userData = null;
          userData={ id: docRef.id, ...added.data() }
          console.log(userData)
          return {docId: userData};

        } catch (error) {
          console.error('Error adding document: ', error);
          throw error;
        }
      }
    async getUserByNameAndColor(candidateName, candidateColor){
      try{
        const querySnapshot = await db
        .where('userName', '==', candidateName)
        .where('userColor', '==', candidateColor).get();
        if (querySnapshot.empty) {
          console.log('No se encontró user');
          return null;
        } else{
          
          let userData = null;
          querySnapshot.forEach(doc => {
            userData = { id: doc.id, ...doc.data() }; 
          });
          
          console.log('Se encontró user ')
          console.log(userData);
          return userData;
        }
        
      
      } catch (error) {
        console.error('Error getting user: ', error);
        throw error;
      }
    }
  
    async getAllUsers() {
      try {
        const snapshot = await db.get();
        
        
        
         let usersData = [];
        
        
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          usersData.push({ id: doc.id, ...doc.data() });
        });
        
        
        return usersData;
        
      } catch (error) {
        console.error('Error getting users: ', error);
        throw error;
      }
    }
      
      
};
    
    


module.exports = new UserRepository();