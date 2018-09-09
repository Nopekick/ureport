const crypto = require("crypto")

exports.createHash = function(email){
  email = email + "secret393939"
  return crypto.createHash('sha1').update(`${email}`).digest('hex');
}
