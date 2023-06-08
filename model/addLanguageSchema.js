const mongoose = require('mongoose');


const languageSchema = mongoose.Schema({
    // languages:[{
    //     type:String,
    //     required:true
    //   }]
    // name: { type: String, required: true },
    languages: { type: String, required: true }
    // languages:[{
    //     type:String,
    //     required:true
    // }]
})


module.exports = mongoose.model('addLanguage',languageSchema);

