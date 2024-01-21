const refreshkey = process.env.JWT_REFSECRET_KEY
const accesskey = process.env.JWT_ACCSECRET_KEY
const jwt = require('jsonwebtoken');
const createjwtToken = require('../../utils/createJwtToken.js');
const wprefreshtokenmodel = require('../../models/wpmodel/wprefresh.model.js');
const wpuseremailmodel = require('../../models/wpmodel/wpauth.model.js');
const wpstartchecktokens = async(req,res) =>{
    const {refreshjwttoken} = req.body
    if(!refreshjwttoken){
        return res.status(408).json({ message: 'Token not found' });
    }
    jwt.verify(refreshjwttoken, refreshkey, async(err, userData)=>{
        if (err) {
            if (err.name === 'TokenExpiredError') {
              return res.status(400).json({ message: 'Token has expired' });
            } else {
              return res.status(402).json({ message: 'Token is invalid' });
            }
        }
          try {
            const user = await wprefreshtokenmodel.findOne({
                userId:userData.userId,
                refreshtoken:refreshjwttoken,
            })
        
            if (!user) {
              return res.status(402).json({ message: 'Token not foundindatabase' });
            }
            const datafortoken={
                userId:user.userId,
            }
            const userdetail = await wpuseremailmodel.findOne({_id:user.userId})
            const userid = userdetail._id;
            const username = userdetail.userName
            const refreshjwttokens = await createjwtToken(datafortoken,refreshkey,'1d')
            const accessjwttoken = await createjwtToken(datafortoken,accesskey,'5m')
            await wprefreshtokenmodel.updateOne({ userId:userData.userId }, { $set: { refreshtoken:refreshjwttokens }})
            res.send({userid,username,refreshjwttokens,accessjwttoken})
          } catch (error) {
            return res.status(400).json({ message: 'can not store token in database' });
          }
      });
    }
module.exports = wpstartchecktokens;