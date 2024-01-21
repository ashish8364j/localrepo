
const asyncHandler = require('../../utils/asyncHandler.js') ;
const wpuseremailmodel = require('../../models/wpmodel/wpauth.model.js');
const wplogin = asyncHandler(async(req,res) =>{
    try {
        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).json({ error: 'Email and password are required' });
        }
        const data = await wpuseremailmodel.findOne({ email, password });
        if (!data) {
          return res.status(404).json({ error: 'User not found' });
        }
        const { _id, userName } = data;
    
        const maindata = {
          _id,
          userName
        };
    
        res.send(maindata);
      } catch (error) {
        res.status(500).json({ error: 'Server Error' });
      }
});
module.exports = wplogin;