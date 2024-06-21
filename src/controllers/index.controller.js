const controller = {}
const DateRepository = require('../repositories/dateRepository')
const UsersRepository = require('../repositories/usersRepository')

controller.index = async (req,res)=>{
    
    res.render('index')

}

controller.addDate = async (req,res)=>{

    try{
        
    //    TODO:: CHECKEAR PORQUE HAN CAMBIADO LOS PARAMETROS DEL BODY
        //console.log("Post con day: "+req.body.day)
        //console.log("Post con userId: ", req.body.userId);
       
        //console.log(`User: ${req.body.userId}, Day: ${req.body.day}`)
           
        
        //Consultar BD, si existe la date con fecha -> ver su lista de users
        //Si userNmae no esta en esa lista
        //  añadir
        //si no
        //  no hacer nada

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

controller.getUser = async (req,res)=>{

    try{
        var candName = req.body.candName;
        var candColor = req.body.candColor;
        
        //console.log("Serv UserName cand: "+req.body.candName)
        //console.log("Serv UserColor cand: ", req.body.candColor);
        const docId = await UsersRepository.getUserByNameAndColor(candName, candColor);

        if(docId == null){
            //console.log("NoExiste: "+docId)
            const created = await UsersRepository.addUser(candName, candColor);
            return res.status(200).json(created);
        }
        return res.status(200).json({ docId });


    }catch(err){
        console.log(err)
    }
}
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



module.exports = controller


