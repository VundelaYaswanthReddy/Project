const Admindetails = require('../models/adminschema')
const Adminpersonal = require('../models/adminperonalschema')
const Student = require('../models/studentschema')
const Room = require('../models/roomschema')
const bcrypt = require('bcrypt')
const cookieparser = require('cookie-parser')
const jwt =require('jsonwebtoken')

const maxAge = 3*24*60*60
const createtoken = (id)=>{
    return jwt.sign({id},'yash secret',{expiresIn : maxAge})
}

const adminsignup_post = async(req,res)=>{
    
    const {username,phonenumber,password}=req.body

    const adminpresent = await Admindetails.findOne({ username }||{ phonenumber })

    if(adminpresent){
        res.send("Admin already registered.....")
    }
    else{
        const salt = await bcrypt.genSalt(10)
        hashedpassword = await bcrypt.hash(password,salt)
          
        const admin = new Admindetails({username,phonenumber,password:hashedpassword})
        const token = createtoken(admin._id)
        res.cookie('jwt',token)
        await admin.save()
        console.log(admin)
        res.send(admin)
    }
}
const adminlogin_post = async(req,res)=>{
  
    const {phonenumber,password}=req.body
    try{
      const admin = await Admindetails.findOne({phonenumber})
      if(admin){
      const hashedpassword = admin.password
      const verify = await bcrypt.compare(password,hashedpassword)
        if(verify){
          const token = createtoken(admin._id)
          res.cookie('jwt',token,{ maxAge:maxAge*1000})
          res.send("Login success")

        }
        else{
          res.send("Incorrect password")
        }
      }
      else{
        res.send('Incorrect Phonenumber')
      }
    }catch(err){
      res.send(err)
    }
  }
const adminpersonal_post = async(req, res)=>{
  try {
    const admin = await Admindetails.findById(req.params.id)
   
    if(admin){
      const personaldetail = new Adminpersonal({

        name:req.body.name,
        phonenumber:req.body.phonenumber,
        email:req.body.email,
        hostelname:req.body.hostelname,
        hosteladdress:req.body.hosteladdress,
        pincode:req.body.pincode,
        state:req.body.state,
        country:req.body.country,
        ac_room:req.body.ac_room,
        non_ac_room:req.body.non_ac_room,
        other_room:req.body.other_room
      });
      await personaldetail.save();
      admin.personaldetails.push(personaldetail);
      await admin.save();
      res.send(personaldetail)
      

    }else{
      res.send("No admin present with above id")
    }
  
  } catch (err) {
    res.status(400).json(err);
  }
}
const roomnumbersadd_post = async(req,res)=>{

  try {
    const adminpersonal = await Adminpersonal.findById(req.params.id)
   
    if(adminpersonal){

      const room = new Room({
        roomnumber:req.body.roomnumber
      });
      await room.save();
      adminpersonal.rooms.push(room);
      await adminpersonal.save();
      res.send(room)
      

    }else{
      res.send("No admindetails present with above id")
    }
  
  } catch (err) {
    res.status(400).json(err);
  }


}
const studentadd_post = async(req,res)=>{

  const adminpersonal = await Adminpersonal.findById(req.params.id)

  if(adminpersonal){

  
    const room = await Room.findOne({roomnumber:req.params.roomnumber})
   
    if(room){

      const student = new Student({

        name:req.body.name,
        email:req.body.email,
        phonenumber:req.body.phonenumber,
        course:req.body.course,
        branch:req.body.branch,
        year:req.body.year,
        parentnumber:req.body.parentnumber,
        uploadphoto:req.body.uploadphoto
      });
      await student.save();
      room.students.push(student);
      await room.save();
      res.send(student)

    }else{
        const room = new Room({
        roomnumber:req.params.roomnumber
      });
      await room.save();
      adminpersonal.rooms.push(room);
      await adminpersonal.save();

      const student = new Student({
        name:req.body.name,
        email:req.body.email,
        phonenumber:req.body.phonenumber,
        course:req.body.course,
        branch:req.body.branch,
        year:req.body.year,
        parentnumber:req.body.parentnumber,
        uploadphoto:req.body.uploadphoto
      });
      await student.save();
      room.students.push(student);
      await room.save();
      res.send(student)
    }
  }  

}
const students_get = async(req,res)=>{
  const populatedOrder = await Room.findById(req.params.id).populate('students');
  res.send(populatedOrder.students);
}
const reqstudent_get = async(req,res)=>{
  
  const student = await Student.findOne({phonenumber:req.params.phonenumber});
    if(student){
      res.send(student)
    }
    else{
      res.send("No student present with above Id or Number")
    }

}

module.exports = { adminsignup_post,adminlogin_post,adminpersonal_post,studentadd_post,students_get,reqstudent_get,roomnumbersadd_post }