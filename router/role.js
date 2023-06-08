const express = require('express');

const router  = express.Router();


const addAdmin = require("../model/addAdminBySuper");
const addAdminBySuper = require('../model/addAdminBySuper');



router.post("/addAdmin",async (req,res)=>{

    const {name,email,password,role} = req.body.inputData;

    const {permissionss} = req.body;

    const permissions = permissionss.map((item)=>item.languages)

    console.log(permissions,"updatedPermissions")

    // const {name,email,password,role,permissions} = req.body

    
    console.log(name,email,role,password,permissions,"in");
 
    
    // console.log(req.body,"req body");

   
    

        if(!name || !email || !role || !permissions || !password){
    
            res.status(400).json({
                error:'All Fields Are Required'
            })
        }

        try {
            const adminExist = await addAdmin.findOne({ email: email });
        
            if (adminExist) {
              return res.status(400).json({ error: "user is already exist" });
            }
        
        
        
            else{

                const data = new addAdmin({ name, email, role, password, permissions});
          
                const isSaved = await data.save();
        
        
        
                if (isSaved) {
                    res.status(200).json({ " message": "Admin register successfully" });
                } else {
                    res.status(400).json({ error: "Failed to register" });
                }
            }
        
          } catch (err) {
        
            return err
          }



}


)




  //         Active /In-Active  Admin

  router.put('/updateAdmin/:id', async (req, res) => {
    try {
      const admin = await addAdmin.findById(req.params.id);
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }

      console.log(admin,"admin-active data");


      

    //   if (admin.status.enum[0] === 'Active') {
    //     admin.status.enum = admin.status.enum[1];
    //     } else {
    //     admin.status.enum[0];
    //     }


            if (admin.status === 'Active') {
            admin.status = 'In-Active';
            } else {
            admin.status = 'Active';
            }

    //   admin.status.enum = !admin.status.enum;
      await admin.save();
  
      return res.status(200).json({ status: admin.status });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });


  
  //   update the admin properties


  router.get('/updateadminproperties/:id', async(req,res)=>{
    const {id} = req.params;

    try{

      const getAdminDetails  = await addAdminBySuper.findOne({_id:id});

      console.log(getAdminDetails,"admin details");

      if(getAdminDetails){
        res.status(200).json({data:getAdminDetails});

      }

      else{
        res.status(400).json({error:"admin not exist"})
      }

    }catch(err){

    }

    console.log(id)
  })

  //  update admin properties after getting api

  router.put('/updateadmins/:id', async(req,res)=>{

    const {name,email,password,role} = req.body.inputData
    console.log(req.body,"from frontend body")

    const {permissionss} = req.body

    const languages = permissionss.map((item)=>item.languages)

    console.log(languages,"updatedPermissions")


    console.log(name,email,password,role,permissionss,"from frontend")
     const {id} = req.params;

     console.log(languages,"languages")

     try{

        const findAdmin = await addAdminBySuper.findByIdAndUpdate({_id:id},{name:name,email:email,password:password,role:role,permissions:languages},{new:true});

        const setFindAdmin = await findAdmin.save();

        if(setFindAdmin){

          res.send(200).json({
            status:200,msg:"Admin details has been updated"
          })
        }
        

        else{
          res.status(400).json({
            error:'Admin details has not been updated'
          })
        }

        


     }
     catch(err){

      res.status(400).json({
        error:err
      })


     }




  })


module.exports  = router;