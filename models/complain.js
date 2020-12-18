const mongoose=require('mongoose');

const Complain=mongoose.model('Complain',new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    RoomNo:{
        type:Number,
        required:true
    },
    Complain:{
        type:String,
        required:true
    },
    typeOF:{
         type:String,
         required:true
    },
    phone:{
        type:Number,
        required:true
    }
}));

exports.Complain=Complain;