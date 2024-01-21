const createHash = require('../utils/createHash.js')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ;
const crypto = require('crypto')
const verifyotpphonee = async(hash,otp,phone,expiry) =>{
    const comparingdata = await `${phone}.${otp}.${expiry}`
    const hashh =  await crypto.createHash('sha256',JWT_SECRET_KEY).update(comparingdata).digest('hex')
    if(hash===hashh){
        return true ;
    }else{
        return false ;
    }
}
module.exports = verifyotpphonee ;