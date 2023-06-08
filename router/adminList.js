const express = require('express');

const router  = express.Router();


const admin = require("../model/addAdminBySuper");



router.get("/adminList",async (req,res)=>{

    try{
        const adminData = await admin.find();
        console.log(adminData);

        if(adminData){
            res.status(200).json({
                "adminData" :adminData
                
            })
        }
        else{

            res.status(400).json({
                "error":"data not found"
            })

        }
    
      
    
    }
    catch(err){
        return err
    }
}

)
  

   
module.exports  = router;