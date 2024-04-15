const express=require('express')
const router=express.Router()
const Person=require('./../models/person')
const {jwtAuthMiddleware,generateToken}=require('./../jwt')

router.post('/signup',async(req,res)=>{
    try{
        const data=req.body
        const newPerson=new Person(data)
        const response=await newPerson.save()
        console.log("Data saved");
        const payload={
            id:response.id,
            username:response.username
        }
        console.log(JSON.stringify(payload));
        const token=generateToken(response.username)
        console.log("Token is:",token);
        res.status(200).json({response:response,token:token})
    }catch(e){
        console.log(e);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
})

//login route
router.post('/login',async(req,res)=>{
    try{
        //extract the username and pass from the body
        const {username,password}=req.body  

        //find the user by username
        const user=await Person.findOne({username:username})

        //if user does not exist or pass is wrong return err
        if(!user || await user.comparePassword(password)){
            return res.status(401).json({
                error:"Invalid username or password"
            })
        }

        //generate token
        const payload={
            id:user.id,
            username:user.username
        }
        const token=generateToken(payload)

        //return token as response
        res.json({token})
    }catch(e){
        console.log(e);
        res.status(500).json({
            error:"Internal server error"
        })
    }
})

//profile route
router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try{
        const userData=req.user
        console.log("User data",userData);

        const userId=userData.id
        const user=await Person.findById(userId)
        res.status(200).json({user})
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

//get method to get the person
router.get('/',jwtAuthMiddleware,async(req,res)=>{
    try{
        const data=await Person.find()
        console.log("Data fetched");
        res.status(200).json(data)
    }catch(e){
        console.log(e);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
})
router.get('/:workType',async(req,res)=>{
    try{
        const workType=req.params.workType
    if(workType=='chef'||workType=='manager'|| workType=='waiter'){
        const response=await Person.find({work:workType})
        console.log("response fetched");
        res.status(200).json(response)
    }else{
        res.status(404).json({
            message:"Invalid work type"
        })
    }
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
    
})

router.put("/:id",async(req,res)=>{
    try{
        const personId=req.params.id
        const updatedPersonData=req.body

        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            runValidators:true
        })
        if(!response){
            return res.status(404).json({
                message:"Person not found"
            })
        }
        console.log("data updated");
        res.status(200).json(response)
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        const personId=req.params.id
        const response=await Person.findByIdAndDelete(personId)
        if(!response){
            return res.status(404).json({
                message:'person not found'
            })
        }
        console.log('data deleted');
        res.status(200).json({
            message:"Person deleted successfully"
        })
    }catch(e){
        console.log(e);
        res.status(500).json({error:"Internal server error"})
    }
})

module.exports=router