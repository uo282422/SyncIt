const controller = {}
const DateRepository = require('../repositories/dateRepository')
const UsersRepository = require('../repositories/usersRepository')

controller.index = async (req,res)=>{
    
    res.render('index')

}

controller.addDate = async (req,res)=>{

    try{
        
       
        console.log("Post con Index: "+req.body.idx)
        console.log("Post con uList: ", req.body.userList);
        for(var u in req.body.userList){
            var user = req.body.userList[u];
            console.log(`User: ${user.userName}, Color: ${user.userColor}`)
           
        }
        //Consultar BD, si existe la date con fecha -> ver su lista de users
        //Si userNmae no esta en esa lista
        //  añadir
        //si no
        //  no hacer nada

        /* DateRepository.addDate(userName, dateData)
        .then(docId => {
            
            console.log("Index: ")
            
        })
        .catch(error => console.error('Error:', error));  */

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


