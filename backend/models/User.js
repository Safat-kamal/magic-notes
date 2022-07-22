const moongoose = require("mongoose");
const validator = require("validator");
const UserSchema = new moongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength:3,
        maxlength:30
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Entered!");
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:5,
    },
    created_At:{    
        type:Date,
        default:Date.now
    }
});

const UserModel = moongoose.model('user',UserSchema);
module.exports = UserModel;