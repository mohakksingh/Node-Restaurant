const express=require('express');
const app=express()
const db=require('./db')
const bodyParser=require('body-parser')
require('dotenv').config()
const passport=require('./auth')

app.use(bodyParser.json())
const PORT=process.env.PORT||3000

//middleware
const logRequest=(req,res,next)=>{
    console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
    next()
}


app.use(logRequest)



app.use(passport.initialize())

const localAuthMiddleware=passport.authenticate('local',{session:false})
app.get('/',function(req,res){
    res.send('Welcome to my hotel... How can I help you?,we have a list of menus')
})



const personRoutes=require('./routes/personRoutes')
app.use('/person',localAuthMiddleware,personRoutes)

const menuItemRoutes=require('./routes/menuItemRoutes')
app.use('/menu',menuItemRoutes)



app.listen(PORT,()=>{
    console.log('listening on port 3000');
})
