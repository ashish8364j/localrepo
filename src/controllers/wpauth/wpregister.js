
const asyncHandler = require('../../utils/asyncHandler.js') ;
const signupSchema = require('../../models/signup.model.js')
const createjwtToken = require('../../utils/createJwtToken.js')
const registerUserPost = asyncHandler(async(req,res,next) =>{
    try {
        
        const user_Data = await signupSchema.create(req.body);
    
        if (!user_Data) {
          return res.status(400).json({ error: 'Failed to save user data' });
        }
    
        res.send('successfully data saved');
        
        const tokens = await createjwtToken(user_Data._id);
      } catch (error) {
        res.status(500).json({ error: 'Server Error' });
      }
});
module.exports = registerUserPost;