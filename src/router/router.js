const express = require('express');
const router = express.Router();
const studentController = require('../controller/logic.js')
router.get('/home',studentController.homepage)
//profile image = name of the image
router.post('/upload',studentController.upload)
module.exports = router;
