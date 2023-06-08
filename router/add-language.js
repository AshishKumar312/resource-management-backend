const express = require('express');

const router  = express.Router();


const Language = require("../model/addLanguageSchema");



// router.post("/addLang",async (req,res)=>{


//     console.log(req.body,"req body");

//     const {languages} = req.body;

  
//     // const role = req.body.role;

//     // const permissions = req.body.permissions;
    

//         if(!languages ){
    
//             res.status(400).json({
//                 error:'All Fields Are Required'
//             })
//         }

//         try {
           
 
//                 const data = new addLang({languages});
          
//                 const isSaved = await data.save();
        
        
        
//                 if (isSaved) {
//                     res.status(200).json({ " message": "Langauge Added Successfully" });
//                 } else {
//                     res.status(400).json({ error: "Failed to Add Language" });
//                 }
            
        
//           } catch (err) {
        
//             return err
//           }



// }


// )



// //   send language to superadmin to apply over lang

// router.get("/langselect",async (req,res)=>{

//     try{
//         const langData = await addLang.find();
  
        
//         console.log(langData,"here");
  
//         if(langData){
//             res.status(200).json({
//                 "langData" :langData
                
//             })
//         }
//         else{
  
//             res.status(400).json({
//                 "error":"data not found"
//             })
  
//         }
    
      
    
//     }
//     catch(err){
//         return err
//     }
//   }
  
 
//   )



//  //  //  //  // 






// Create a new language
router.post('/api/languages', async (req, res) => {
  try {
    const {  languages } = req.body;
    const language = await Language.create({  languages });
    res.status(200).json(language);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create language' });
  }
});

// Get all languages
router.get('/api/languages', async (req, res) => {
  try {
    const languages = await Language.find();
    res.json(languages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve languages' });
  }
});

// Get a specific language by ID
router.get('/api/languages/:id', async (req, res) => {
  try {
    const language = await Language.findById(req.params.id);
    if (!language) {
      return res.status(404).json({ error: 'Language not found' });
    }
    res.json(language);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve language' });
  }
});

// Update a language by ID
router.put('/api/languages/:id', async (req, res) => {
  try {
    const { name, languages } = req.body;
    const language = await Language.findByIdAndUpdate(
      req.params.id,
      { name, languages },
      { new: true }
    );
    if (!language) {
      return res.status(404).json({ error: 'Language not found' });
    }
    res.json(language);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update language' });
  }
});

// Delete a language by ID
router.delete('/api/languages/:id', async (req, res) => {
  try {
    const language = await Language.findByIdAndRemove(req.params.id);
    if (!language) {
      return res.status(404).json({ error: 'Language not found' });
    }
    res.json({ message: 'Language deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete language' });
  }
});







module.exports  = router;