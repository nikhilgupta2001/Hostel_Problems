const jwt=require('jsonwebtoken');
var cookieParser = require('cookie-parser')
require('dotenv').config()

module.exports=(req,res,next)=>{
    try{
        // console.log('hello');
        console.log(req.cookies);
        // console.log(process.env.JWT_KEY);
        jwt.verify(req.cookies,process.env.JWT_KEY,(err,decoded)=>{
            console.log(decoded);
            // req.userData=decoded;
            // next();

        });

       
    }
    catch(error)
    {
       return res.status(401).json({
           message:'Auth Failed Please Login First'
       }) 
    }
    next(); 
}