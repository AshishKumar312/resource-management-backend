const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticates = require('../middleware/adminsAuth')

const router = express.Router();

const alreadyFilledBySuperAdmin = require("../model/addAdminBySuper");

const OtpTable = require('../model/otp');



// send email

// const nodemailer = require('nodemailer');


// let mailTransporter = nodemailer.createTransport({
// 	service: 'gmail',
// 	auth: {
// 		user: 'xyz@gmail.com',
// 		pass: '*************'
// 	}
// });

// let mailDetails = {
// 	from: 'xyz@gmail.com',
// 	to: 'abc@gmail.com',
// 	subject: 'Test mail',
// 	text: 'Node.js testing mail for GeeksforGeeks'
// };

// mailTransporter.sendMail(mailDetails, function(err, data) {
// 	if(err) {
// 		console.log('Error Occurs');
// 	} else {
// 		console.log('Email sent successfully');
// 	}
// });



//   Login

router.post("/admins/login", async (req, res) => {

    //   console.log(req.body);
    //   res.send(req.body)
    
      try {
        const { email, password } = req.body;
    
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
    
        const adminLogin = await alreadyFilledBySuperAdmin.findOne({ email: email });
    
        console.log("Admin Login", adminLogin);

        console.log(adminLogin.permissions,"permissions by adminLogin")
        
        if(adminLogin){
    
          const isMatch = await bcrypt.compare(password, adminLogin.password);
    
       
          if (!isMatch) {
            res.status(400).json({ error: "Invalid Credential" });
          } else {
            
            const token  = await adminLogin.generateAuthToken();
            console.log(token)
            
            
      
            res.cookie("jwtoken",token, {
              expires: new Date(Date.now() + 9000000),
              httpOnly:true
            })
            res.status(201).json({"token":token,"roles":adminLogin.role,"permissions":adminLogin.permissions,"status":adminLogin.status})
            
            
            
          }
    
        }

        else{
          res.status(400).json({ error: "Invalid Cradential" });
    
        }
    
    
      } catch (err) {
        console.log(err)
      }
    });
    

// authentication for first page in frontend

router.get('/validateAdmin',authenticates,async(req,res)=>{

   console.log("done")

  try{

    console.log(req.userID,"req User ID")

    const validAdmin = await alreadyFilledBySuperAdmin.findOne({_id:req.userID});

    

    console.log(validAdmin,"validAdmin");
    res.status(201).json({status:201,validAdmin})



  }
  catch(err){

    res.status(400).json({status:400,err})

  }



})


//   Otp Verification // Reset Password

//  router.post('/admin/login/emailsend',async (req,res)=>{

//   const {email} = req.body

  
    
//   if(!email){
//     res.status(400).json({
//       error: "Enter Your Email ID"
//     })
    
//   }

//   try{

//     const userFind = await alreadyFilledBySuperAdmin.findOne({email:email});

 

//       console.log(userFind,"userFound")





//   }
//   catch(err){

//     console.log(err)

//   }

//   // else{

//   //   const otp = Math.floor((Math.random()*10000)+1);

//   //   const optData = new OtpTable({
//   //     email:email,
//   //     code:otp,
//   //     expireIn: new Date().getDate() + 300*1000
//   //   })

//   //   const optResponse = await optData.save();

//   //   if(optResponse){

//   //     res.status(200).json({
//   //       msg:"Please Check Your Email ID"
//   //     })

//   //   }

//   //   else{

//   //     res.status(400).json({
//   //       msg:"You Did Something Wrong"
//   //     })

//   //   }
//   // }
//  })

module.exports = router;
