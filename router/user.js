const express = require('express');

const router  = express.Router();


const fields = require("../model/fieldSchema");


router.get("/users",async (req,res)=>{



    const search = req.query.search || ""
    console.log("search",search);

  
    const query = {
      "contact.PROF" : { $regex: search, $options: "i" }
    }
    
    
    //  const page = req.query.page ? parseInt(req.query.page): 1
    
    //  const size = req.query.size ? parseInt(req.query.size): 10
    //  const  skip = (page) *size;
     
    //  const total = await  fields.countDocuments();
     
    //  const users = await fields.find(query).skip(skip).limit(size)
     const userData = await fields.find(query);

     res.json({
      userData
     })
    //  res.json({
    //   records:users,
    //   size,
    //   total,
    //   page,

    //  });

  
  })

  
  router.get('/user/language/',async (req,res)=>{
    
    const  permissions = req.headers.authorization;


    console.log(permissions,"permissions headers")

    

    try{
      // const  selectedData = await fields.find({"contact.PROF":"Full Stack developer"});


     
      console.log(typeof permissions,"headers")
      

      const selectedData = await fields.find({"contact.PROF":{"$in":JSON.parse(permissions)}});
      // const  selectedData = await fields.find({"contact.PROF":"nodejs"});

      // console.log(justCheck)
      

      

      console.log(selectedData,"selected Data");

      if(selectedData){
        res.status(200).json({
          "dataByLang":selectedData
        })

   
      }

      else{
        res.status(400).json({

          "error": "data not found"
          
        })
      }
    }
    catch(err){
      return err
    }


  })

  
  
  router.get('/users/:id',async (req,res)=>{
  
    const singleData = await fields.findById(req.params.id);
    console.log(singleData)
    res.send(singleData)
  
  })

module.exports  = router;