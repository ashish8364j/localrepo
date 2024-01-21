const asyncHandler = require('../../utils/asyncHandler.js')
const wpusermessagemodel = require('../../models/wpmodel/wpmessages.js')
const wpgetchatmsg = asyncHandler ( async(req,res) =>{
       try { 
              const { msgId } = req.body;
              if (!msgId) {
                return res.status(400).json({ error: 'Message ID is missing' });
              }
          
              const data = await wpusermessagemodel.find({ uniqueMessageId: msgId }).sort({ createdAt: -1 });
              res.send(data);
            } catch (error) {
              res.status(500).json({ error: 'Server Error' });
            }
})
module.exports = wpgetchatmsg