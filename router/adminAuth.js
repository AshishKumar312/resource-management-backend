// const express = require("express");
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const authenticate = require('../middleware/adminAuthenticate')

// const router = express.Router();

// const AdminRegisterData = require("../model/adminRegisterSchema");
// const Admin = require("../model/adminRegisterSchema");

// // const rolesData = require('../model/roleSchema');

// //     Register

// router.post("/admin/register", async (req, res) => {
//   // res.send('Register Api calling');

  
//   // const type = req.body || 'ADMIN';
//   // const roles = [type]


//   const { name, email, phone, password, cpassword} = req.body;

//   // const findRoles =  await rolesData.findOne({ email:email  });

//   // console.log("find Role",findRoles)

//   // const {role,permissions} = findRoles;

//   // console.log(role,permissions)



//   if (!name || !email || !phone || !password || !cpassword) {
//     res.status(422).send({ error: "All fields are required" });
//   }

//   try {
//     const adminExist = await AdminRegisterData.findOne({ email: email });

//     if (adminExist) {
//       return res.status(422).json({ error: "user is already exist" });
//     }

//     else if(password != cpassword){
//       res.status(422).json({error:"password and confirm password should be match"})
//     }

//     else{

//       const data = new AdminRegisterData({ name, email, phone, password, cpassword });
      
//       // console.log(type)
//       const AdminRegister = await data.save();

//       if (AdminRegister) {
//         res.status(201).json({ " message": "admin register successfully" });
//       } else {
//         res.status(422).json({ error: "Failed to register" });
//       }
//     }

//   } catch (err) {

//     return err
//   }
// });




// //   Login

// router.post("/admin/login", async (req, res) => {

// //   console.log(req.body);
// //   res.send(req.body)

//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ error: "All fields are required" });
//     }

//     const adminLogin = await AdminRegisterData.findOne({ email: email });

//     console.log("Admin Login", adminLogin);
    
//     if(adminLogin){

//       const isMatch = await bcrypt.compare(password, adminLogin.password);

   
//       if (!isMatch) {
//         res.status(400).json({ error: "Invalid Credential" });
//       } else {
        
//         const token  = await adminLogin.generateAuthToken();
//         console.log(token)
        
        
  
//         res.cookie("jwtoken",token, {
//           expires: new Date(Date.now() + 9000000),
//           httpOnly:true
//         })
//         res.status(201).json({"token":token})
        
        
        
//       }

//     }
//     else{
//       res.status(400).json({ error: "Invalid Cradential" });

//     }


//   } catch (err) {
//     console.log(err)
//   }
// });


// // authentication for first page in frontend

// router.get('/validateAdmin',authenticate,async(req,res)=>{

//    console.log("done")

//   try{

//     console.log(req.userID,"req User ID")

//     const validAdmin = await AdminRegisterData.findOne({_id:req.userID});

    

//     console.log(validAdmin,"validAdmin");
//     res.status(201).json({status:201,validAdmin})



//   }
//   catch(err){

//     res.status(400).json({status:400,err})

//   }





// })

// module.exports = router;
