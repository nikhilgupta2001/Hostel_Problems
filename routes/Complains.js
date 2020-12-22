const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();
const Complain=require('../models/complain');
// const complain = require('../models/complain');

/*----------------------------------------------------------------------------------------------*/
router.post('/',async(req,res)=>{
    console.log(req.body);
    let complain=new Complain({
           name:req.body.name,
           type:req.body.typeofhostel,
           RoomNo:req.body.RoomNo,
           problem:req.body.problem,
           typeOF:req.body.type,
           phone:req.body.phone,
           description:req.body.description
    })
    complain=await complain.save();
    res.redirect('/');
});
/*---------------------------------------------Get All Complains Api----------------------------------------------*/

//@route GET api/post
//@desc Get posts
//@access Public
//so that the all post can be seen by all
router.get('/',(req,res)=>{
    Complain.find()
        
        .sort({date:-1})
        .then(complain =>res.json(complain))
        .catch (err =>res.status(404).json(err));
});

/*--------------------------------------------Get Complain by Id  Api----------------------------------------------*/

//@route GET api/post/:id
//@desc Get posts by id
//@access Public

//so that the all post can be seen by all
//@here we use params to grab the id of that user which in url

router.get('/:id',(req,res)=>{
    //method to find it by id is important!
    Complain.findById(req.params.id)
        .then(post =>res.json(post))
        .catch (err =>res.status(404).json({noprofile:'There is no such profile exist for this Id'}));
});

/*------------------------------------------Post Api-------------------------------------------------

//@route POST api/post
//@desc Create Post
//@access Private(by passport)

router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    
   
   const complain=new Complain({
    name:req.body.name,
    type_of_hostel:req.body.type_of_hostel,
    RoomNo:req.body.RoomNo,
    Complain:req.body.Complain,
    typeOF:req.body.type,
    phone:req.body.phone
    });  
    complain.save().then(new_complain=>res.json(new_complain));
    });

/*----------------------------------------Delete Api-------------------------------------------------

//@route DELETE api/post/:id
//@desc Delete Post
//@access Private(by passport)

router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Complain.findOne({user:req.user.id})
    .then(profile=>{
        Post.findById(req.params.id)
        .then(post=>{
        //Check for Post Owner
        
        if(post.user.toString() !==req.user.id){
            //401-unauthorization 
            return res.status(401).json({noauthorization:'User not Authorized'});
    
        }
        //Delete
        post.remove().then(()=>res.json({success:true}));
    })
    .catch(err=>res.status(404).json({postnotfound:'No Post Found'}));
    })
    });


 ----------------------------------------------------------------------------------------------*/


router.delete('/:id',async(req,res)=>{
    const complain=await Complaint.findById(req.params.id);

})


/*----------Searching Options By Type Of--------*/
router.get('/SearchByType',(req,res)=>{
    const searchField=req.query.typeOF;
    Complain.find({typeOF:{$regex:searchedField}})
            .then(data=>{
                res.send(data);
            }) 
})

/*--------Searching Options By Wings-------*/

router.get('/SearchByWing',(req,res)=>{
    const searchWing=req.query.Wing;
})







module.exports=router;







