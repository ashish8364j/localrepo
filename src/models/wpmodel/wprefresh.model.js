const mongoose = require('mongoose')
const wprefreshtokenSchema = mongoose.Schema({
    refreshtoken:{
    type: String,
    unique: true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,ref:'wpuseremail',
    },
})
const wprefreshtokenmodel = mongoose.model('wprefreshtoken',wprefreshtokenSchema);
module.exports = wprefreshtokenmodel;