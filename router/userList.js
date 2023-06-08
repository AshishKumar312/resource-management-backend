const express = require('express');

const router  = express.Router();


const user = require("../model/fieldSchema");



router.get("/userList",async (req,res)=>{

    try{
        const userData = await user.find({}).select('contact');
        console.log(userData);

        if(userData){
            res.status(200).json({
                "userData" :userData
                
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