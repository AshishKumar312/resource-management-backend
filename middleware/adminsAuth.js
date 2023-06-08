const jwt = require('jsonwebtoken');

const admin = require('../model/addAdminBySuper');




const adminAuthenticates  = async (req,res,next) =>{

    try{

        console.log (admin,"admin")

        const token = req.headers.authorization
        console.log("token from cookies",token);
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
        console.log(verifyToken,"verifyToken")

        console.log("verifyToken id",verifyToken._id);

 
    
        const rootUser = await admin.findOne({_id:verifyToken._id});
        console.log(rootUser,"root-user");

        console.log(rootUser._id,"rootUser");

        if(!rootUser){
            throw new Error('admin Not Found')
        }
        
        req.token = token;
        req.rootUser = rootUser;
        req.userID =rootUser._id;

        next();

    }


    catch(err){

        res.status(400).json({error:"Unauthorized Access , Token not available"})
    }



}

module.exports = adminAuthenticates;