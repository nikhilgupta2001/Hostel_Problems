const jwt=require('jsonwebtoken');
var cookieParser = require('cookie-parser')
require('dotenv').config()

module.exports=(req,res,next)=>{
    try{
        // console.log('hello');
        console.log(req.cookies.token);
        // console.log(process.env.JWT_KEY);
        jwt.verify(req.cookies.token, process.env.JWT_KEY,(err,decoded)=>{
            if(err)
            {
                res.status(500).json({err:"Not Authorized"})
            }
            // console.log(decoded);
            req.userData=decoded;
            next();
        });

       
    }
    catch(error)
    {
       return res.status(401).json({
           message:'Auth Failed Please Login First'
       }) 
    }
   
}