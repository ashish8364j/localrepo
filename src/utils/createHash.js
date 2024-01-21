const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ;
const crypto = require('crypto')

const createHash = async(data) => {
    const hashh =  await crypto.createHash('sha256',JWT_SECRET_KEY).update(data).digest('hex')
    return hashh
}
module.exports = createHash;