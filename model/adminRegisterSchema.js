// const mongoose = require("mongoose");
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

// const cookieParser = require('cookie-parser')


// const adminSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },

//   email: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: Number,
//     required: true,
//   },

//   password: {
//     type: String,
//     required: true,
//   },
//   cpassword: {
//     type: String,
//     required: true,
//   },

//   roles:[{type:String}],
//   tokens:[
//     {
//       token: {
//         type:String,
//         required:true
//       }
//     }
//   ]
// });


// //  Hashing the password


// adminSchema.pre('save', async function(next){
//   if(this.isModified('password')){
    
//     this.password = await bcrypt.hash(this.password,12);
//     this.cpassword = await bcrypt.hash(this.cpassword,12);
//   }
//   next();

// });

// // generating token



// adminSchema.methods.generateAuthToken =  async function(){

//   try{

//      let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
//      this.tokens = this.tokens.concat({token:token});
//      await this.save();
//      return token;


//   }
//   catch(err){

//     return err


//   }


// }



// module.exports = mongoose.model("admins", adminSchema);