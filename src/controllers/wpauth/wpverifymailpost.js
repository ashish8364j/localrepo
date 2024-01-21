
const asyncHandler = require('../../utils/asyncHandler.js') ;
const createjwtToken = require('../../utils/createJwtToken.js')
const verifyotpphonee = require('../../utils/verifyotpphonee.js')
const wpuseremailmodel = require('../../models/wpmodel/wpauth.model.js');
const wprefreshtokenmodel = require('../../models/wpmodel/wprefresh.model.js');
refreshkey = process.env.JWT_REFSECRET_KEY
accesskey = process.env.JWT_ACCSECRET_KEY
const wpverifymailpost= asyncHandler(async(req,res,next) =>{
    const { hash,otp,email } = req.body
    const [hashotp,expiry] = (hash.hash).split('-')
    const phone = email
    const response = await verifyotpphonee(hashotp,otp,phone,expiry)
    if(response){  
         try{
            const userdata = await wpuseremailmodel.create({
                email:email
            })

            const datafortoken = {
                phone : email,
                userId: userdata._id
          }
         const refreshjwttoken = await createjwtToken(datafortoken,refreshkey,'30d')
         const accessjwttoken = await createjwtToken(datafortoken,accesskey,'5d')
         await wprefreshtokenmodel.create({
             refreshtoken:refreshjwttoken,
             userId:userdata._id
         })
         res.send({refreshjwttoken,accessjwttoken})
         }catch(err){
            if(err.code=='11000'){
                res.status(422).json({
                    message: err.message
                  });
            }else{
                res.status(500).json({
                    message: err.message
                  });
            }
         }
    }
    if(!response){
        res.send(false)
    }
});
module.exports = wpverifymailpost;