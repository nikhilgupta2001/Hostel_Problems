require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const router=express.Router();
const User=require('../models/Users');
const bcrypt=require('bcrypt');
const Complain=require('../models/complain')
const mongoose=require('mongoose');
const { response } = require('express');
const url=require('url')
// const app=express();
// app.use(express.json());

router.post('/signup',(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        console.log(req.body);

        if(user.length>=1){
            return res.status(409).json({
                message:'Mail exists'
            })
        }
        else{
            // console.log("HELLO");
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err)
                {
                    return res.status(500).json({
                        error:err
                    });
                }
                else{
                    const user=new User({
                        _id:new mongoose.Types.ObjectId(),
                        email:req.body.email,
                        password:hash,
                        name:req.body.name,
                        RoomNo:req.body.RoomNo,
                        HostelName:req.body.HostelName
                    });
                    user
                       .save()
                       .then(result=>{
                        //    console.log(result);
                        // //    res.status(201).json({
                        // //        message:'User created'
                        // //    });
                        // alert("You are Successfully Registered");
                        res.redirect('/');
                       })
                       .catch(err =>{
                           console.log(err);
                           res.status(500).json({
                               error:err
                           });
                       });
        };
        });
        }

    })
  
});

router.post('/login',(req,res,next)=>{
    // console.log(req.body);
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({
                message:"Auth failed"
            });
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err){
                 return res.status(401).json({
                     message:'Auth failed'
                 }); 
            }
            if(result){
                // console.log(process.env.JWT_KEY);
                const token=jwt.sign(
                {
                    email:user[0].email,
                    userId:user[0]._id,
                    RoomNo:user[0].RoomNo,
                    name:user[0].name,
                    HostelName:user[0].HostelName
                },
                process.env.JWT_KEY
                )
                // console.log(user);
                // req.render('/profile',{...data})
                return res.cookie('token',token)
                .redirect(url.format({
                    pathname:"/profile",
                    query:{
                        "email":user[0].email,
                        "id":user[0]._id,
                        "name":user[0].name,
                        "RoomNo":user[0].RoomNo,
                        "HostelName":user[0].HostelName
                    }
                }))
                
            }
            res.status(401).json({
                message:'Auth failed'
            });
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
                    // res.redirect('/');

});

router.delete('/:userId',(req,res,next)=>{
   User.remove({_id:req.params.userID})
   .exec()
   .then(result=>{
       res.status(200).json({
           message:'User deleted'
       })
   })
   .catch(err=>{
       console.log(err);
       res.status(500).json({
           error:err
       });
   });
});


// router.post('/login', (req, res) => {
//     const email = req.body.email;
//     const user = { email: email };
//     const acessToken = generateAcessToken(user);
//     res.json({ acessToken: acessToken })
// })

// router.get('/login',(req,res)=>{
//     res.render('auth');
// })

module.exports=router;