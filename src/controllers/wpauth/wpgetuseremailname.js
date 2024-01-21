
const asyncHandler = require('../../utils/asyncHandler.js') ;
const wpuseremailmodel = require('../../models/wpmodel/wpauth.model.js');
const wpgetuseremailname = asyncHandler(async(req,res) =>{
    try {
        const { userId} = req.body;
        if (!userId ) {
          return res.status(400).json({ error: 'Email and password are required' });
        }
    
        const data = await wpuseremailmodel.find(
            { _id: userId },
          );
        if (!data) {
          return res.status(404).json({ error: 'User not found' });
        }
        const { userName,email } = data[0];
        const maindata = {
          userName,
          email
        };
    
        res.send(maindata);
      } catch (error) {
        res.status(500).json({ error: 'Server Error' });
      }
});
module.exports = wpgetuseremailname;