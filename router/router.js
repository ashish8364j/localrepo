const express = require('express');
const router = express.Router();
const studentController = require('../controller/logic.js')
console.log(studentController);
const path = require('path')
const multer = require('multer')
const uploadpath = path.join(process.cwd(),'npmmod','ytproject','uploads')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadpath)
    },
    filename: function (req, file, cb) {
        cb(null,file.fieldname + '-'+ Date.now() + '.jpg')
    }
  })
const upload = multer({ storage })
router.get('/home',studentController.homepage)
//profile image = name of the image
router.post('/upload',upload.single('profileimage'),studentController.upload)
module.exports = router;
