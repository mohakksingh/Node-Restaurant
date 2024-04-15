const express=require('express')
const router=express.Router()
const MenuItem=require('./../models/menuItem')

//Post method to add a Menu Item
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

//get menu items
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
        const tasteType=req.params.taste //extracting the taste type from the URL Parameter
        if(taste=='sweet'||taste=='sour'||taste=='spicy'||taste=='bitter'||taste=='salty'){
            const response=await MenuItem.find({taste:tasteType})
            console.log("Data fetched");
            res.status(200).json(response)
        }else{
            res.status(404).json({
                message:"Invalid taste type"
            })
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
})

router.put('/:id',async(req,res)=>{
    try{
        const menuId=req.params.id
        const updatedMenuData=req.body

        const response=await MenuItem.findByIdAndUpdate(menuId,updatedMenuData,{
            new:true,
            runValidators:true
        })

        if(!response){
            return res.status(404).json({
                error:"Menu item not found"
            })
        }
        console.log("Data updated");
        res.status(200).json(response)

    }catch(e){
        console.log(e);
        
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const menuId=req.params.id

        const response=await MenuItem.findByIdAndDelete(menuId)
        if(!response){
            return res.status(404).json({
                error:"Menu item not found"
            })
        }

        console.log("data deleted");
        res.status(200).json({
            message:"Menu successfully deleted"
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
})
module.exports=router