const mongoose = require('mongoose');


const fieldSchema = mongoose.Schema({
    contact:{},
    education:[],
    workExperience:[],
    skill:[],
    Hobby:[],
    image:String
    
})


module.exports = mongoose.model('resume',fieldSchema);





