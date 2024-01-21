const jwt = require('jsonwebtoken');
accesskey = process.env.JWT_ACCSECRET_KEY
function wpchecktoken(req, res, next) {
    const {accessjwttoken} = req.body;
  if (!accessjwttoken){
    return res.status(403).json({ message: 'access Token is missing' })
  }
  jwt.verify(accessjwttoken, accesskey, (err, userData) => {
    if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token has expired' });
        } else {
          return res.status(402).json({ message: 'Token is invalid' });
        }
      }
    req.user = userData
    next(); 
  });
}
module.exports = wpchecktoken
