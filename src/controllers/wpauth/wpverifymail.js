
const asyncHandler = require('../../utils/asyncHandler.js') ;
const createHash = require('../../utils/createHash.js')
const otp = require('../../utils/6digitotp.js');
const sendVerifyEmail = require('../../utils/sendVerifyEmail.js');
const wpverifymail = asyncHandler(async(req,res,next) =>{
    let { email } = req.body
    const tte = 1000*60*2  
    const expiry = Date.now() + tte 
    const Otp = otp()
    const data = `${email}.${Otp}.${expiry}`
    const hash = await createHash(data)
    try{
        const maildata = {
            email,
            Otp
        }
        const a = await sendVerifyEmail(maildata)
        res.send(`${hash}-${expiry}`)  
    }catch(err){
        res.status(500).json({
            message: err.message
          });
    }
});
module.exports = wpverifymail;