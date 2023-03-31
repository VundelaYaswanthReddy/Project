const mongoose=require('mongoose')

const room=new mongoose.Schema({
    roomnumber:{ type:Number , required:true },
    students:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
})

module.exports = mongoose.model('Room', room);