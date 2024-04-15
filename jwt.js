const jwt=require('jsonwebtoken')

const jwtAuthMiddleware=(req,res,next)=>{

    const token=req.headers.authorization.split(' ')[1];
    if(!token){
        res.status(401).json({
            error:"Unauthorized"
        })
    }
    try{
        //verify jwt
        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        req.user=decoded
        next()
    }catch(e){
        console.log(e);
        res.status(401).json({
            error:"Invalid token"
        })
    }
}

//function to generate token
const generateToken=(userData)=>{
    //generate
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:30})
}
module.exports={jwtAuthMiddleware,generateToken}