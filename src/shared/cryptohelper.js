//import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import configHelper from './confighelper'

class CryptoHelper {
  createJWTToken(objIn) {
    return jwt.sign(objIn, configHelper.jwtSecret, {expiresIn: 60*60});
  }
}

export default new CryptoHelper();
