const controller = {}
const DateRepository = require('../repositories/dateRepository')

controller.index = async (req,res)=>{


    try{

        const title = 'INDEX DESDE EL SERVIDOR CON PUG y desde una variable'
        
        const dateData = {
            
          };
          
          DateRepository.addDate('John Doe2', dateData)
            .then(docId => console.log('Date added with ID:', docId))
            .catch(error => console.error('Error:', error));

        res.render('index', {title:title})

    }catch(err){
        console.log(err)
    }
}

module.exports = controller