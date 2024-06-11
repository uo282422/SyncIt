const controller = {}
const DateRepository = require('../repositories/dateRepository')

controller.index = async (req,res)=>{
    
    res.render('index')

}

controller.addDate = async (req,res)=>{

    try{
        const userName=req.body.texto
        console.log("Llamada al post, texto: "+userName)
        const dateData = {};
        console.log("Index: "+req.body.idx)

        /* DateRepository.addDate(userName, dateData)
        .then(docId => {
            
            console.log("Index: ")
            
        })
        .catch(error => console.error('Error:', error));  */

    }catch(err){
        console.log(err)
    }
}

module.exports = controller


