//import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import configHelper from './confighelper'

class CryptoHelper {
  createJWTToken(objIn) {
    return jwt.sign(objIn, configHelper.jwtSecret, {expiresIn: 60 * 60});
  }

  decodeJwtToken(token) {
    try {
      return jwt.verify(token, configHelper.jwtSecret);
    }
    catch(err) {
      return null;
    }
  }
}

export default new CryptoHelper();
