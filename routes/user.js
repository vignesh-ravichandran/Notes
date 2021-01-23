const express=require('express');
const bcrypt =require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt    =require('jsonwebtoken');
const User = require('../module/user');
const router =express.Router();



//@route - post /user/signup
//@desc  - register a new user
//@access- public 

router.post('/signup',[
 check('name','Name is required').not().isEmpty(),
 check('email','Please enter a valid Email').isEmail(),
 check('password','Password should be of minimum 6 characters').isLength({min:6})

],async (req,res)=>{
   const errors= validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()});
   }

    const {name, email, password}=req.body;
    try {
        let user = await User.findByEmail(email);
        
        if(user){
            return res.status(400).json({msg: "User already exists"});
        }
        
    const salt= await bcrypt.genSalt(10);

    const hashPassword= await bcrypt.hash(password,salt);
     
    let newUser =await User.saveNewUser(name, email, hashPassword);
     
     
     const payload={
         user:{
             id:newUser.dataValues.id
         }
     }
      
     jwt.sign(payload,process.env.JWTSECRET,{
         expiresIn:360000
     },(err,token)=>{
         if(err) throw err;
         res.json({
            msg:'User registered successfull', 
            token:token});
     });



    } catch (err) {
        console.error(err);
        res.status(500).send({
            msg:'server error',
            error:err
        });
    }
   
});


//@route - post /user/login
//@desc  - Auth user and get token 
//@access- public

router.post('/login',[
    check('email','Please enter a valid email ').isEmail(),
    check('password','Password is required').exists()
],async (req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email, password}=req.body;
    try {
        let user=await User.findByEmail(email);
        if(!user){
            return res.status(400).json({msg:"invalid credentials"});
        }
        user=user.dataValues;
       
        
        const isMatch=await bcrypt.compare(password, user.hashPassword);

        if(!isMatch){
            return res.status(400).json({msg:"wrong password"});
        }

        const payload={
            user:{
                id:user.id
            }
        }
         
        jwt.sign(payload,process.env.JWTSECRET,{
            expiresIn:360000
        },(err,token)=>{
            if(err) throw err;
            res.json({
                msg:'Loged in Successfully', 
                token:token});
        });


    } catch (err) {
        console.error(err);
        res.status(500).send({
            msg:'server error',
            error:err
        });
    }

  
});



module.exports=router;

