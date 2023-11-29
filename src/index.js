//database is in other continent(time lagta hai so use async await)
//database se baat karne me problem a sakti hai so use try-catch or promises
const express = require('express')
const app = express()
const path = require('path')


require('dotenv').config()
//database url
const URL = process.env.MONGODB_URI 
//port no
port = process.env.PORT
//for connect with database
const dbConnection = require('../src/db/connectdb.js')
dbConnection(URL);



//view engine
const ejs = require('ejs')
app.set('view engine','ejs')
//view path
const viewPath = path.join(process.cwd(),'ytproject','views')
app.set('views',viewPath)

//make public to folder
const staticPath = path.join(process.cwd(),'ytproject','public')
app.use(express.static(staticPath))


//for read frontend data
app.use(express.urlencoded({extended:false}))


//middleware
const routerr = require('../src/router/router.js')
app.use('',routerr);


//for listening to the port 5000
app.listen(port,()=>{
    console.log(`listening to the port ${port}`);
})