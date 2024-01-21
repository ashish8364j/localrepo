const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json({limit:`${process.env.DATA_LIMIT}`}))
app.set('view engine', 'ejs');
const viewPath = path.join(process.cwd(), 'src' , 'viewfolder');
app.set('views', viewPath);
app.use(express.urlencoded({extended:true,limit:`${process.env.DATA_LIMIT}`}))
app.use(express.static("public"))
app.use(cookieParser())
const userRouter = require('./routes/user.routes.js')
app.use('',userRouter)
module.exports = app ;