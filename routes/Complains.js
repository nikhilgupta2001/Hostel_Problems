const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();
const Complain=require('../models/complain');


router.post('/',async(req,res)=>{
    let complain=new Complain({
           name:req.body.name,
           RoomNo:req.body.RoomNo,
           Complain:req.body.Complain,
           typeOF:req.body.type,
           phone:req.body.phone
    })
    complain=await complain.save();
    res.send(complain);
});


router.delete('/:id',async(req,res)=>{
    const complain=await Complain.findById(req.params.id);

})
module.exports=router;







