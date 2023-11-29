//database is in other continent(time lagta hai so use async await)
//database se baat karne me problem a sakti hai so use try-catch or promises

const env = require('dotenv').config()
console.log(process.env.PORT) 
const express = require('express')
const app = express()
const path = require('path')
const routerr = require('../src/router/router.js')
//database url
const URL = process.env.MONGODB_URI 
//port no
port = process.env.PORT
//view engine
const ejs = require('ejs')
app.set('view engine','ejs')
//for connect with database
const dbConnection = require('../src/db/connectdb.js')
dbConnection(URL);
//for read fronend data
app.use(express.urlencoded({extended:false}))
//view path
const viewPath = path.join(process.cwd(),'ytproject','views')
app.set('views',viewPath)
//make public to folder
const staticPath = path.join(process.cwd(),'ytproject','public')
app.use(express.static(staticPath))
//for listening to the port 5000
app.use('',routerr);
app.listen(port,()=>{
    console.log(`listening to the port ${port}`);
})