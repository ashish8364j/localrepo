const mongoose = require('mongoose')
const dbConnection = async(URL)=>{
    try{
        console.log(dbName)
        await mongoose.connect(URL,`${process.env.DB_NAME}`)
        console.log('connected...');
    }
    catch(err){
        console.error("error :" , err);
    }
}
module.exports = dbConnection