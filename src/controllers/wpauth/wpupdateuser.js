const asyncHandler = require("../../utils/asyncHandler.js");
const wpuseremailmodel = require("../../models/wpmodel/wpauth.model.js");
const wpupdateuser = asyncHandler(async (req, res) => {
  try {
    const { userId, newuserName } = req.body;
    if (!userId || !newuserName) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const data = await wpuseremailmodel.findOneAndUpdate(
      { _id: userId },
      { $set: { userName: newuserName } },
      { new: true }
    );
    if (!data) {
      return res.status(404).json({ error: "User not found" });
    }
    const { userName } = data;

    const maindata = {
      userName,
    };

    res.send(maindata);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});
module.exports = wpupdateuser;
