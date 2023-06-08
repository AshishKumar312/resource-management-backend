const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticate = require('../middleware/superAdminAuthenticate');

const router = express.Router();

const superAdminRegisterData = require("../model/superAdminRegisterSchema");
const Admin = require("../model/superAdminRegisterSchema")

const nodemailer = require('nodemailer');

// send email



let mailTransporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'ashish.k@latitudetechnolabs.com',
		pass: 'Welcome$123'
	}
});


//     Register

router.post("/super-admin/register", async (req, res) => {
  // res.send('Register Api calling');

  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    res.status(422).send({ error: "All fields are required" });
  }

  try {
    const adminExist = await superAdminRegisterData.findOne({ email: email });

    if (adminExist) {
      return res.status(422).json({ error: "user is already exist" });
    }

    else if(password != cpassword){
      res.status(422).json({error:"password and confirm password should be match"})
    }

    else{

      const data = new superAdminRegisterData({ name, email, phone, password, cpassword });
  
      const superAdminRegister = await data.save();

      if (superAdminRegister) {
        res.status(201).json({ " message": "Super Admin register successfully" });
      } else {
        res.status(422).json({ error: "Failed to register" });
      }
    }

  } catch (err) {

    return err
  }
});


//   Login

router.post("/super-admin/login", async (req, res) => {

//   console.log(req.body);
//   res.send(req.body)

  try {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const adminLogin = await superAdminRegisterData.findOne({ email: email });

    console.log("Admin Login", adminLogin);
    
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
        res.status(201).json({"token":token})
        
        
        
      }

    }
    else{
      res.status(400).json({ error: "Invalid Cradential" });

    }


  } catch (err) {
    console.log(err)
  }
});



  // Reset Password
    
router.post('/super-admin/login/emailsend',async (req,res)=>{

  const {email} = req.body

  
    
  if(!email){
    res.status(400).json({
      error: "Enter Your Email ID"
    })
    
  }

  try{

    const userFind = await superAdminRegisterData.findOne({email:email});


    if(userFind){

         // generating token for reset password

    const token = jwt.sign({_id:userFind._id},process.env.SECRET_KEY,{
      expiresIn:"1d"
    });

    console.log(token,"tokrn   n")

    const setUserToken = await superAdminRegisterData.findByIdAndUpdate({_id:userFind._id},{verifyToken:token},{new:true});
    
    console.log(setUserToken.verifyToken,"setUserToken verify")
   
    if(setUserToken){
      const mailOptions = {
        from :"ashish.k@latitudetechnolabs.com",
        to:email,
        subject:"sending email for reset password ",
        text:`This Link Is Valid For Two Minutes http://localhost:3001/forgotpassword/${userFind.id}/${setUserToken.verifyToken}`
   
      }

      mailTransporter.sendMail(mailOptions,(error,info)=>{

        if(error){

          console.log(error)
          res.status(400).json({status:400,
            error:"email not send"
          })
        }

        else{

           console.log(info.response,"email sent")
          res.status(200).json({status:200,
            msg:"email sent successfully"
          })
        }

      })
    }


    }


    else{
      res.status(400).json({error:"email Doesn't match"})
    }



  }
  catch(err){

    console.log(err)

  }


 })


 // validate user for authentication as for reset password


 router.get('/forgotpassword/:id/:token',async (req,res)=>{
   
  const {id,token} = req.params;

  try{
      
    const validUser = await superAdminRegisterData.findOne({_id:id,verifyToken:token});

    const verifytoken = jwt.verify(token,process.env.SECRET_KEY);

    if(validUser && verifytoken._id){

      console.log(verifytoken,"verify token")

      res.status(200).json({status:200,validUser})
 
    }

    else{

      res.status(400).json({
        status:400, error:"user not verified"
      })
    }



  }
  catch(err){

    res.status(400).json({status:400,err})


  }

 })


 // change the password 


 router.post('/sendpassword/:id/:token',async(req,res)=>{

  const {id,token} = req.params;

  const {password} = req.body;

  try{
     

           
    const validUser = await superAdminRegisterData.findOne({_id:id,verifyToken:token});

    const verifytoken = jwt.verify(token,process.env.SECRET_KEY);

    if(validUser && verifytoken._id){

      const newPassword = await bcrypt.hash(password,12);

      const setNewPassword = await superAdminRegisterData.findByIdAndUpdate({_id:id},{password:newPassword});

      setNewPassword.save();

      if(setNewPassword){
        res.status(200).json({
          status:200,msg: setNewPassword
        })
      }


 
    }

    else{

      res.status(400).json({
        status:400, error:"user not exist"
      })
    }

  }
  catch(err){

    res.status(400).json({
      status:400, error:"user not exist"
    })


  }



 })


// authentication for landing page in frontend

router.get('/validateSuperAdmin',authenticate,async(req,res)=>{

  console.log("done")

  try{

    console.log(req.userID,"req User ID");

    const validUser = await superAdminRegisterData.findOne({_id:req.userID});

  

    console.log(validUser,"validUser");
    res.status(201).json({status:201,validUser})

  }
  catch(err){

    res.status(400).json({status:400,err:"invalid user"})

  }

})

module.exports = router;
