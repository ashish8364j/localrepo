const mongoose = require('mongoose')
const dbConnection = async(URL)=>{
    try{
        dbName  = {
            dbName : process.env.DB_NAME
        }
        await mongoose.connect(URL,dbName)
        //jab express ki app baat na kar pa rhi ho
        app.on("error",(error)=>{
            console.log("ERROR :",error);
            throw error
        })
        console.log('connected...');
    }
    catch(error){
        console.error("error :" , error);
        process.exit(1)
    }
}
module.exports = dbConnection