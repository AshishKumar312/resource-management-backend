require("dotenv").config();

const express = require("express");

const cookieParser = require('cookie-parser');


const cors = require("cors");

const PORT  = process.env.PORT || 5000

require("./db/config");

const fields = require("./model/fieldSchema");

const app = express();

app.use(cookieParser());

app.use(express.json({limit: '50mb'}));

app.use(express.json());

app.use(cors());



// Api Creation For Auth {import}
app.get('/',(req,res)=>{
  res.status(200).send({msg:'Welcome'})
})
app.use(require('./router/auth'));
// app.use(require('./router/adminAuth'));
app.use(require('./router/superAdminAuth'));
app.use(require('./router/role'));
app.use(require('./router/admin-auth'));
app.use(require('./router/adminList'));
app.use(require('./router/userList'));;
app.use(require('./router/add-language'));




app.post("/field" ,async (req, res) => {

  try{

    const data = new fields(req.body)
  
    res.status(200).json({status:200})
  
  
    let result = await data.save();

  console.log(result);
//   res.send(result);


  }
  catch(err){



  }


});

app.use(require('./router/user'));


app.listen(PORT || 5000, () => {
  console.log("server is running on PORT 5000");
});



