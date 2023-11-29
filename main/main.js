const express = require('express')
const app = express()
const path = require('path')
const routerr = require('../router/router.js')
//database url
const URL = process.env.URL || 'mongodb://127.0.0.1:27017'
//port no
port = 5000;
//view engine
const ejs = require('ejs')
app.set('view engine','ejs')
//for connect with database
const dbConnection = require('../db/connectdb.js')
dbConnection(URL);
//for read fronend data
app.use(express.urlencoded({extended:false}))
//view path
const viewPath = path.join(process.cwd(),'npmmod','ytproject','views')
app.set('views',viewPath)
//make public to folder
const staticPath = path.join(process.cwd(),'npmmod','ytproject','public')
app.use(express.static(staticPath))
//for listening to the port 5000
app.use('',routerr);
app.listen(port,()=>{
    console.log('listening to the port 5000');
})
