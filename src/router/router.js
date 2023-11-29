const express = require('express');
const router = express.Router();
const studentController = require('../controller/logic.js')
console.log(studentController);
const path = require('path')
router.get('/home',studentController.homepage)
//profile image = name of the image
router.post('/upload',studentController.upload)
module.exports = router;
