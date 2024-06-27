const controller = {}
const DateRepository = require('../repositories/dateRepository')
const UsersRepository = require('../repositories/usersRepository')
const { body, validationResult } = require('express-validator');

controller.index = async (req,res)=>{
    
    res.render('index')

}

controller.addDate = async (req,res)=>{

    try{

         DateRepository.addDate(req.body.day, req.body.userId, req.body.userCol)
        .then(docId => {
            
            console.log("Dia añadido a BD con dia "+req.body.day+" y color "+req.body.userCol)
            
        })
        .catch(error => console.error('Error:', error));  

    }catch(err){
        console.log(err)
    }
}
controller.getDatesByUser = async (req,res)=>{

    try{
        var uId = req.body.userId;
        
    
        const docId = await DateRepository.getDatesByUser(uId);

        if(docId == null){
            
            
            return null;
        }
        return res.status(200).json({ docId });


    }catch(err){
        console.log(err)
    }
}

controller.getUser = [
    body('candName').notEmpty().withMessage('El nombre del candidato es obligatorio.'),
    body('candColor').notEmpty().withMessage('El color del candidato es obligatorio.'),

    async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        
        var candName = req.body.candName.toLowerCase();
        var candColor = req.body.candColor;

        const docId = await UsersRepository.getUserByNameAndColor(candName, candColor);

        if(docId == null){

            const created = await UsersRepository.addUser(candName, candColor);
            return res.status(200).json(created);
        }
        return res.status(200).json({ docId });


    }catch(err){
        console.log(err)
    }
}
];
controller.getAllUsers = async (req,res)=>{

    try{
       
        const docId = await UsersRepository.getAllUsers();

        if(docId == null){
            
           //No hay usuarios en la base de datos
        }
        return res.status(200).json({ docId });


    }catch(err){
        console.log(err)
    }
}


controller.deleteUser = async (req,res)=>{
    const userId = req.params.id;
    try {
        const deleteDatesByUser = await DateRepository.deleteDatesByUser(userId);
        const deletedUser = await UsersRepository.deleteUser(userId); 
       
        return res.status(200).json({ message: 'Usuario eliminado correctamente' });
       
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error del servidor' });
    }
}
module.exports = controller


