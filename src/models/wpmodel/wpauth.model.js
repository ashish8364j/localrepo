const mongoose = require('mongoose')
const useremailSchema = mongoose.Schema({
    email:{
    type: String,
    unique: true,
    
    },
    activated:{
    type:Boolean,
    default:false,
    required:false
    },
    password:{
    type:String,
    default:'',
    required:false
    },
    userName:{
    type:String,
    default:'',
    required:false
    },
    avatar:{
    type:String,
    default:'',
    required:false
    },
    isOnline:{
        type:String,
        default:'offline',
        required:false
        },
})
const wpuseremailmodel = mongoose.model('wpuseremail',useremailSchema);
module.exports = wpuseremailmodel;