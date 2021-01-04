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
            {   console.log("Not Authorized");
               // res.status(500).json({err:"Not Authorized"})
               res.send('<script>alert("Plese Login !!!!")</script>').redirect('/');             
            }
            // console.log(decoded);
            req.userData=decoded;
            next();
        });

       
    }
    catch(error)
    {   console.log("Auth Failed Please Login First");
        
        
    }
   
}
