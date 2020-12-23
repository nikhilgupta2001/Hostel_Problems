const jwt=require('jsonwebtoken');
var cookieParser = require('cookie-parser')
require('dotenv').config()

module.exports=(req,res,next)=>{
    try{
        console.log(req.cookies);
        console.log(process.env.JWT_KEY);
        const decoded=jwt.verify(req.cookies,process.env.JWT_KEY);
        // req.userData=decoded;
        next();
    }
    catch(error)
    {
       return res.status(401).json({
           message:'Auth Failed Please Login First'
       }) 
    }
    next(); 
}