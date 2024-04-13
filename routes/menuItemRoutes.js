const express=require('express')
const router=express.Router()
const MenuItem=require('./../models/menuItem')

router.post('/',async(req,res)=>{
    try{
        const data=req.body
        const newMenu=new MenuItem(data)
        const response= await newMenu.save()
        console.log("data saved");
        res.status(200).json(response)
    }catch(e){
        console.log(e);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
})
router.get('/',async(req,res)=>{
    try{
        const data=await MenuItem.find()
        console.log("Menu fetched");
        res.status(200).json(data)
    }catch(e){
        res.status(500).json({
            error:"internal server error"
        })
    }
})

router.get('/:taste',async(req,res)=>{
    try{
        const taste=req.params.taste
        const data=await MenuItem.find({taste})
        if(taste=='sweet'||taste=='sour'||taste=='spicy'||taste=='bitter'||taste=='salty'){
            console.log("Data fetched");
            res.status(200).json(taste)
        }else{
            res.status(404).json({
                message:"Invalid keyword"
            })
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
})

module.exports=router