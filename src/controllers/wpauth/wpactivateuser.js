const asyncHandler = require('../../utils/asyncHandler.js')
const wpuseremailmodel = require('../../models/wpmodel/wpauth.model.js')
const wpactivateuser = asyncHandler ( async(req,res,next) =>{
       try {
              const { password, username, avatar } = req.body;
              const userId = req.user.userId;
          
              if (!userId) {
                return res.status(400).json({ error: 'User ID is missing' });
              }
              const user = await wpuseremailmodel.updateOne(
                { _id: userId },
                {
                  password: password,
                  activated: true,
                  userName: username,
                  avatar: avatar
                }
              );
              if (!user || user.nModified === 0) {
                return res.status(400).json({ error: 'User not found or no modifications made' });
              }
              res.send(userId);
            } catch (error) {
              res.status(500).json({ error: 'Server Error' });
            }
})


module.exports = wpactivateuser