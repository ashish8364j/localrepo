const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ;
const jwt = require('jsonwebtoken');
const createToken = async(tokendata,seckey,exp) => {
    const token = await jwt.sign(tokendata,
        seckey,{expiresIn:exp});
    return token ;
}
module.exports = createToken;