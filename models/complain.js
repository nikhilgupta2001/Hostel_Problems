const mongoose=require('mongoose');

const Complain=mongoose.model('complain',new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    RoomNo:{
        type:String,
        required:true
    },
    problem:{
        type:String,
        required:true
    },
    typeOF:{
         type:String,
         required:false
    },
    phone:{
        type:Number,
        required:true
    },
    description:{
        type:String
    }
    
}));

// exports.Complain=Complain;
module.exports=Complain;