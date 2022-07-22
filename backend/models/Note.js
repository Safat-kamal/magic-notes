const moongoose = require('mongoose');
const NotesSchema = new moongoose.Schema({
    user:{
        type: moongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title : {
        type:String,
        required:true
    },
    description : {
        type: String,
        required:true
    },
    tag : {
        type:String,
        default: 'General'
    },
    Created_At:{
        type:Date,
        default:Date.now
    }
})

module.exports = moongoose.model('note',NotesSchema);