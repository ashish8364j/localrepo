const mongoose = require('mongoose')
const dbConnection = async(URL)=>{
    try{
        const obj = {
            dbName : 'grocery'
        }
        mongoose.connect(URL,obj)
        console.log('connected...');
    }
    catch(err){
        console.log(err);
    }
}
module.exports = dbConnection