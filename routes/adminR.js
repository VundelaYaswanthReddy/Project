const { Router } = require('express')
const router =Router()

const { adminsignup_post,adminlogin_post,adminpersonal_post,studentadd_post, students_get, reqstudent_get, roomnumbersadd_post }=require('../controllers/adminC')

router.post('/newadmin',adminsignup_post)
router.post('/adminlogin',adminlogin_post)
router.post('/admindetail/:id',adminpersonal_post)
router.post('/roomnumberadd/:id',roomnumbersadd_post)
router.post('/studentadd/:id/:roomnumber',studentadd_post)
router.get('/students/:id',students_get)
router.get('/reqstudent/:phonenumber',reqstudent_get)

module.exports =  router




//{ newadmin        = To create the new admin }
//{ adminlogin      = To login the already registered admin }
//{ admindetail/:id = Adding the admin details to the registered admin using the admin id }
//{ roomnumberadd/:id = Add the rooms numbers present in the hostel }
//{ studentadd/:id/:roomnumber  = To add the students under the admin using the admin personal detail id and the room number }
//{ students/:id    = To get all the students present under the admin }
//{ /reqstudent/:phonenumber = To get the particular student using his phonenumber as the unique id }