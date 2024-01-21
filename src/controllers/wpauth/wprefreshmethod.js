const refreshkey = process.env.JWT_REFSECRET_KEY
const accesskey = process.env.JWT_ACCSECRET_KEY
const jwt = require('jsonwebtoken');
const createjwtToken = require('../../utils/createJwtToken.js');
const wprefreshtokenmodel = require('../../models/wpmodel/wprefresh.model.js');
const wprefreshtoken = async(req,res,next) =>{
    const {refreshjwttoken} = req.cookies
    if(!refreshjwttoken){
        console.log('token not found');
    }
    jwt.verify(refreshjwttoken, refreshkey, async(err, userData)=>{
        
        if (err) {
            
            if (err.name === 'TokenExpiredError') {
              
              console.log('Token has expired');
              return res.status(400).json({ message: 'Token has expired' });
            } else {
              
              console.error('Invalid token:', err.message);
              return res.status(400).json({ message: 'Token is invalid' });
            }
        }
          try {
            const user = await wprefreshtokenmodel.findOne({
                userId:userData.userId,
                refreshtoken:refreshjwttoken
            })
        
            if (!user) {
              console.log('user not found');
              return false; 
            }
            const datafortoken={
                userId:userData.userId,
            }
            const refreshjwttokens = await createjwtToken(datafortoken,refreshkey,'1d')
            const accessjwttoken = await createjwtToken(datafortoken,accesskey,'2m')
            await wprefreshtokenmodel.updateOne({ userId:userData.userId }, { $set: { refreshtoken:refreshjwttokens }})
            await res.cookie('refreshjwttoken',refreshjwttokens,{
            maxAge:1000*60*60*24*30,  
            httpOnly:true,
        })
           await res.cookie('accessjwttoken',accessjwttoken,{
           maxAge:1000*60*60*24*30,
           httpOnly:true,
    })
    
    res.send('ok')
          } catch (error) {
            return res.status(500).json({ message: 'server error' }); 
          }
        
      });

    }
module.exports = wprefreshtoken;