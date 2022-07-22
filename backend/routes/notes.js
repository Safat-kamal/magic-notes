const express =  require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const { off } = require('../models/Note');


// Route 1 : get all the notes of a user.
router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try{
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
    }
});


// Route 2 : add new notes of a user.
router.post('/addnote',fetchuser,[
    body('title','Title is too short').isLength({ min: 3 }),
    body('description','Description is too short').isLength({ min: 5 }),
], async (req,res)=>{
    try {
        const {title,description,tag}  = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // adding note
        const note = new Note({
            title:title,
            description:description,
            tag: tag,
            user: req.user.id
        });
        const savenote = await note.save();
        res.send(savenote);
        
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});



// Route3 : update the existing note.
router.put("/updatenote/:id",fetchuser,async (req,res)=>{
    const {title,description,tag} = req.body;
    try{
        // creating new object with the receiving value
        const newNote = {}
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};


        // validate the note and update the note
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found!");
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note =  await Note.findByIdAndUpdate(req.params.id,{$set:newNote}),{new:true};
        res.send(note);
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
    }

});




// ROute 4 : Delete an existing note
router.delete("/deletenote/:id",fetchuser,async (req,res)=>{
    try{
        //validate user existance and delete a note
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found!");
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json("Note Deleted Successfully!")
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;