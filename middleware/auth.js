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
               // res.status(500).json({err:"Not Authorized"})
               res.render('/');
               alert("Please Sign Up!!!!")
            }
            // console.log(decoded);
            req.userData=decoded;
            next();
        });

       
    }
    catch(error)
    {  
        res.render('/');
        alert("Auth Failed Please Login First");
    }
   
}
