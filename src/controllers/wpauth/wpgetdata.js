const asyncHandler = require('../../utils/asyncHandler.js')
const wpuseremailmodel = require('../../models/wpmodel/wpauth.model.js')
const wpgetdata = asyncHandler ( async(req,res) =>{
       try {
              const { currentId } = req.body;
          
              if (!currentId) {
                return res.status(400).json({ error: 'Current ID is missing' });
              }
          
              const usersExceptCurrent = await wpuseremailmodel.find({ _id: { $ne: currentId } });
          
              if (!usersExceptCurrent) {
                return res.status(400).json({ error: 'No users found except the specified ID' });
              }
              res.send(usersExceptCurrent);
            } catch (error) {
              res.status(500).json({ error: 'Server Error' });
            }
})
module.exports = wpgetdata