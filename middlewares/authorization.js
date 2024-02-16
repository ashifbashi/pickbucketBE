const jwt = require('jsonwebtoken')

const userAuth=(req,res,next)=>{
   
    try {
        
        const token = req.headers['authorization'].split(' ')[1]
        jwt.verify(token,"pickbucket",(err,decodedToken)=>{

            if(decodedToken){
               req.userId=decodedToken.userId
               next()
            }else{
                res.status(401).json({message:"unauthorized user"})
            }
        })

    } catch (error) {
        console.log(error);
        res.status(401).json({message:"unauthorized user"})
    }
}


const adminAuth=(req,res,next)=>{
   
    try {
        
        const token = req.headers['authorization'].split(' ')[1]
        jwt.verify(token,"pickbucket",(err,decodedToken)=>{

            if(decodedToken && decodedToken.role===1){
               req.userId=decodedToken.userId
               next()
            }else{
                res.status(401).json({message:"unauthorized user"})
            }
        })

    } catch (error) {
        console.log(error);
        res.status(401).json({message:"unauthorized user"})
    }
}

module.exports={userAuth,adminAuth}