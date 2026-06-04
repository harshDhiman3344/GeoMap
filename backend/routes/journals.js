const express = require('express');

const router = express.Router();

const Journal = require('../models/Journal');


//fetching the journals 

router.get("/",async (req,res)=>{

    try{
        const journals = await Journal.find();
        res.json(journals);

    }

    catch(err){
        res.status(500).json({message: err.message});

    }

});


router.get('/:id',async (req, res) => {

    try{
        const journal = await Journal.findById(req.params.id);
        if (!journal) return res.status(404).json({message: "Journal not found"});
        
        res.json(journal);


    }
    catch (err){
        res.status(500).json({message: err.message});

    }

})


// POST CREATE Journal

router.post("/", async (req, res)=>{
    const userId = req.headers['x-user-id'];
    const username = req.headers['x-username'];
    
    if (!userId || !username) {
        return res.status(401).json({message: "User ID and username are required"});
    }
    
    const {text, coordinates} = req.body;

    const journal = new Journal({
        userId,
        username,
        text,
        location :{
            type: 'Point',
            coordinates 
        }

    });

    try{
        const newJournal = await journal.save();
        res.status(201).json(newJournal);

    }
    catch(err){
        res.status(400).json({message: err.message});

    }
});


//PUT UPDATE JOURNAL

router.put('/:id',async(req,res)=>{
    const userId = req.headers['x-user-id'];
    
    if (!userId) {
        return res.status(401).json({message: "User ID is required"});
    }
    
    try{
        const journal = await Journal.findById(req.params.id);
        
        if (!journal) return res.status(404).json({ message: 'Journal not found' });
        
        if (journal.userId !== userId) {
            return res.status(403).json({message: "Only the creator can update this journal"});
        }
        
        const updated = await Journal.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//DELETE journal

router.delete('/:id',async(req,res)=>{
    const userId = req.headers['x-user-id'];
    
    if (!userId) {
        return res.status(401).json({message: "User ID is required"});
    }
    
    try{
        const journal = await Journal.findById(req.params.id);
        
        if(!journal) return res.status(404).json({message: 'Journal Not Found'});
        
        if (journal.userId !== userId) {
            return res.status(403).json({message: "Only the creator can delete this journal"});
        }
        
        await Journal.findByIdAndDelete(req.params.id);
        res.json({message: 'Journal deleted'});
    
    }   catch (err){
        res.status(500).json({message:err.message});

    }

});



module.exports = router;

