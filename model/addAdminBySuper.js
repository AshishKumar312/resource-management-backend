const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const cookieParser = require('cookie-parser')




const adminSchemaBySuper = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true
    },
    permissions:[{type:String}],

    // languages:[{
    //   type:String
    // }]
    

  status:{
        type: String,
        enum : ["Active","In-Active"],
        default: 'Active'
    },
    tokens:[
        {
          token: {
            type:String,
            required:true
          }
        }
      ]

})


//  Hashing the password


adminSchemaBySuper.pre('save', async function(next){
    if(this.isModified('password')){
      
      this.password = await bcrypt.hash(this.password,12);

    }
    next();
  
  });
  
  // generating token
 
  adminSchemaBySuper.methods.generateAuthToken =  async function(){
  
    try{
  
       let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
       this.tokens = this.tokens.concat({token:token});
       await this.save();
       return token;
  
  
    }
    catch(err){
  
      return err
  
  
    }
  
  
  }



module.exports = mongoose.model('adminCretBySup',adminSchemaBySuper);


