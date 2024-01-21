const mongoose = require('mongoose');
const logger = require('../utils/consolelog.js')
const connectDb = async (a) => {
    try{
        DB_NAME = process.env.DB_NAME;
        const connectInfo = await mongoose.connect(`${a}/${DB_NAME}`)
        logger.info(`\n MongoDb connected ${connectInfo.connection.host}`);
    }catch(error){
        logger.error("ERR dbConnection folder:" , error);
        process.exit(1)
    }
}

module.exports = connectDb