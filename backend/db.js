const mongoose = require('mongoose');
// const mongoURI = process.env.DATABASE_URL_COMPASS;
const mongoURI = process.env.DATABASE_URL_ATLAS;

mongoose.connect(mongoURI,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then((response)=>{
    console.log("Database Connected")
}).catch((e)=>{
    console.log(e.message)
});
