const mongoose = require('mongoose')


const admindetails = new mongoose.Schema({
    username:{
        type:String,
        requried:true
    },
    phonenumber:{
        type:Number
    },
    password:{
        type:String,
        required:true
    },
    personaldetails:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Adminpersonal' }]

  });
  
module.exports = mongoose.model('Admindetails', admindetails);
  