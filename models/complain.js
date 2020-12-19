const mongoose=require('mongoose');

const Complain=mongoose.model('Complain',new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type_of_hostel:{
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
    },
    date:{
        type:Date,
        default:Date.now
    }
    
}));

exports.Complain=Complain;