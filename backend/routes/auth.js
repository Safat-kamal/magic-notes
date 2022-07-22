const express =  require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

const jwt_secret = process.env.JWT_SCRET;

// Route 1 : use to create a user in the database
router.post('/CreateUser',async (req,res)=>{
    try{
        let success = false;
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({"error":"Entered Email Already Existed."})
        }

        const salt = await bcrypt.genSalt(10);
        const SecurePassword = await bcrypt.hash(req.body.password,salt);

        user = await User.create({
            "name":req.body.name,
            "email":req.body.email,
            "password":SecurePassword
        });
        const data = {
            user:{
                id:user.id
            }
        }

        const authToken = jwt.sign(data,jwt_secret);
        success = true;
        res.json({success,authToken});
    }
    catch(error){
        res.status(500).send("Internal Server Error!");
        console.log(error.message);
    }
});

// Route 2 : TO validate login details of the users
router.post("/login",[
body('email','Invalid Email Entered').isEmail(),
body('password',"Password Cannot be blank").exists(),
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password}  = req.body;
    let success=false;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(500).send({error:"Invalid Credentials Entered."});
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(500).send({error:"Invalid Credentials Entered."});
        }
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwt_secret);
        success = true;
        res.json({success, authToken});

    }
    catch(error){
        res.send(500).send("Internal Server Error");
        console.log(error.message);
    }
});


//  ROute 3 : use to fetch loggedin user details after successfull loggedin.
router.post("/getuser", fetchuser, async (req,res)=>{
    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }
    catch(error){
        res.status(500).send("Internal Server Error!");
        console.log(error.message);
    }
});

module.exports = router;