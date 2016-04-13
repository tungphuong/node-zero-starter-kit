import crypto = require('crypto');
import jwt = require('jsonwebtoken');
import configHelper from './confighelper';

class CryptoHelper {
  createJWTToken(objIn) {
    return jwt.sign(objIn, configHelper.jwtSecret, {expiresInMinutes: 60});
  }

  decodeJwtToken(token) {
    try {
      return jwt.verify(token, configHelper.jwtSecret);
    }
    catch(err) {
      return null;
    }
  }
  
  createSalt(){
    return crypto.randomBytes(16).toString('base64');
  }

  createHash(clearText, salt){
    return crypto.pbkdf2Sync(clearText, salt, 4096, 64).toString('base64');
  }
}

export default new CryptoHelper();
