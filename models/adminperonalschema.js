const mongoose=require('mongoose')

const details=new mongoose.Schema({
    name:{ type:String , required:true },
    phonenumber:{ type:Number , required:true },
    email:{ type:String , required:true },
    hostelname:{ type:String , required:true },
    hosteladdress:{ type:String , required:true },
    //imageurl:{ type:String , required:true },
    pincode:{ type:Number , required:true },
    state:{ type:String , required:true },
    country:{ type:String , required:true },
    ac_room:['Mixed'],
    non_ac_room:['Mixed'],
    other_room:['Mixed'],
    rooms:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }]
})

module.exports = mongoose.model('Adminpersonal', details);
