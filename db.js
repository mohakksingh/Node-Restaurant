const mongoose = require("mongoose");

const mongoUrl =
  "mongodb+srv://singhmohak999:bd7PEoW8LVzcUj1K@cluster0.puacwvd.mongodb.net/";
mongoose.connect(mongoUrl);

const db=mongoose.connection

db.on('connected',()=>{
    console.log('connected to mongo db');
})
db.on('error',()=>{
    console.log('error in mongo db');
})
db.on('disconnected',()=>{
    console.log('disconnected to mongo db');
})

module.exports=db;
