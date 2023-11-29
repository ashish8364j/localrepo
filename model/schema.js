const mongoose = require('mongoose');

const adressSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    age:{
        type:Number,
        required: true,
        
    },
    photo:{
        type:String,
        required: true
    }
}) 

const grahak = new mongoose.model('grahak',adressSchema)

module.exports = grahak