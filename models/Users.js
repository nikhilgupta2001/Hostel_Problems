const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    name:{type:String,required:true},
    RoomNo:{type:Number,required:true},
    HostelName:{type:String,required:true}
});


module.exports=mongoose.model('User',userSchema);