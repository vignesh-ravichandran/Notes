const express=require('express');

const { check, validationResult } = require('express-validator');

const User = require('../module/user');
const Note = require('../module/notes');

const auth = require('../middleware/auth');

const router =express.Router();



//@route  - /notes/
//@desc   - view notes of a user
//@access - protected
router.get('/',[auth],async (req,res)=>{
    
   
    let offset= req.query.page? (req.query.page-1):0;
    let limit = req.query.limit? req.query.limit : 5;
   
    try {
        const result=await Note.getNotesofUser(req.userId,Number(limit), Number(offset));
       
        
        let resobj={
            totalpages:Math.ceil(result.count/limit),
            currentpage:(offset+1),
            notes:result.rows
        }
        res.json(resobj);
    } catch (err) {
        console.error(err);
        res.status(500).send({
            msg:'server error',
            error:err
        });
    }
    
});


//@route  - /notes/
//@desc   - add a new note
//@access - protected
router.post('/',[auth,
    check('title','Title for notes is required ').exists(),
    check('text','Notes text is required').exists()
],async (req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {title, text}=req.body;
   
    try {
        const newNotes =await Note.addNotes(text,title, req.userId);
        res.json({msg: 'Note added successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).send({
            msg:'server error',
            error:err
        });
    }
    
});


//@route  - /notes/:noteId
//@desc   - update a note with title/text
//@access - protected
router.put('/:noteId',[auth],async (req,res)=>{
  
    if(!req.params.noteId || isNaN(req.params.noteId)){
        return res.status(400).json({msg: 'Need id of the note'});
     }

    const {title, text}=req.body;
   
    try {
        const updatedNotes =await Note.updateNotes(req.params.noteId, title, text,req.userId);
        
        res.json({
            msg: 'Note updated successfully',
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            msg:'server error',
            error:err
        });
    }
    
});



//@route  - /notes/:noteId
//@desc   - delete the note of the user
//@access - protected
router.delete('/:noteId',[auth],async (req,res)=>{
    
     
     if(!req.params.noteId || isNaN(req.params.noteId)){
        return res.status(400).json({msg: 'Need id of the note'});
     }
    
    try {
        const deleteNotes =await Note.deleteNotes(req.params.noteId,req.userId)
        res.json({msg: 'Note deleted successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).send({
            msg:'server error',
            error:err
        });
    }
    
});


module.exports=router;
