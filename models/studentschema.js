const mongoose=require('mongoose')

const student=new mongoose.Schema({
    name:{ type:String , required:true },
    email:{ type:String , required:true },
    phonenumber:{ type:Number , required:true },
    course:{ type:String , required:true },
    branch:{ type:String , required:true },
    year:{ type:String , required:true },
    parentnumber:{ type:Number , required:true },
    uploadphoto:{ type:String , required:true }
})

module.exports = mongoose.model('Student', student);
