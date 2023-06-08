const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticate = require('../middleware/authenticate')

const router = express.Router();

const registerData = require("../model/userRegisterSchema");
const User = require("../model/userRegisterSchema");

//     Register

router.post("/register", async (req, res) => {
  // res.send('Register Api calling');

  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    res.status(422).send({ error: "All fields are required" });
  }

  try {
    const userExist = await registerData.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "user is already exist" });
    }

    else if(password != cpassword){
      res.status(422).json({error:"password and confirm password should be match"})
    }

    else{

      const data = new registerData({ name, email, phone, password, cpassword });
  
      const userRegister = await data.save();

      if (userRegister) {
        res.status(201).json({ " message": "user register successfully" });
      } else {
        res.status(422).json({ error: "Failed to register" });
      }
    }

  } catch (err) {

    console.log(err);
  }
});




//   Login

router.post("/login", async (req, res) => {

//   console.log(req.body);
//   res.send(req.body)

  try {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const userLogin = await registerData.findOne({ email: email });

    console.log("User Login", userLogin);
    
    if(userLogin){

      const isMatch = await bcrypt.compare(password, userLogin.password);

   
      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credential" });
      } else {
        
        const token  = await userLogin.generateAuthToken();
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
    console.log(err);
  }
});


// authentication for landing page in frontend

router.get('/validateUser',authenticate,async(req,res)=>{

  // console.log("done")

  try{

    console.log(req.userID,"req User ID")

    const validUser = await User.findOne({_id:req.userID});

    

    console.log(validUser,"validUser");
    res.status(201).json({status:201,validUser})



  }
  catch(err){

    res.status(400).json({status:400,err})

  }





})

module.exports = router;
