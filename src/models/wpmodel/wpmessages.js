const mongoose = require('mongoose')
const messagesSchema = mongoose.Schema({
    _id:{
        type:String,
        required:false,
    },
    sentBy:{
    type: String,
    required:false
    },
    sentTo:{
    type:String,
    required:false
    },
    createdAt:{
    type:Date,
    required:false
    },
    text:{
    type:String,
    required:false
    },
    uniqueMessageId:{
    type:String,
    required:false
    },
    user: {
      _id:{
        type:String,
        required:true
      }
      },
})
const wpusermessagemodel = mongoose.model('wpusermessage',messagesSchema);
module.exports = wpusermessagemodel;