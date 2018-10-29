import React from 'react';
import { sha256 } from 'react-native-sha256';

export default class SecurityUtility {
  static hash256(stringToEncrypt) {
    /*return sha256(stringToEncrypt).then( hash => {
        return hash;})*/
    return stringToEncrypt;
  }

}
