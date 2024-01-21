const refreshkey = process.env.JWT_REFSECRET_KEY
const accesskey = process.env.JWT_ACCSECRET_KEY
const createjwtToken = require('../../utils/createJwtToken.js');
const wprefreshtokenmodel = require('../../models/wpmodel/wprefresh.model.js');
const wploginrefresh = async(req,res,next) =>{
try {
    const { email, userid } = req.body;

    if (!email || !userid) {
      return res.status(400).json({ error: 'Email and UserID are required' });
    }

    const datafortoken = {
      phone: email,
      userId: userid
    };

    const refreshjwttokens = await createjwtToken(datafortoken, refreshkey, '2d');
    const accessjwttoken = await createjwtToken(datafortoken, accesskey, '1d');

    const updateResult = await wprefreshtokenmodel.updateOne({ userId: userid }, { $set: { refreshtoken: refreshjwttokens } });
    if (!updateResult || updateResult.nModified === 0) {
      return res.status(500).json({ error: 'Failed to update refresh token' });
    }

    const response = {
      refreshjwttokens,
      accessjwttoken
    };
    res.send(response);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }

    }
module.exports = wploginrefresh;