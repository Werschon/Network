import React from 'react';

export default class LoginStyles {

  static LOGO_MAX_HEIGHT = 50;
  static LOGO_MIN_HEIGHT = 50;
  //You have to use one of those keywords if you want to call LoginStyles.logo(keyword)
  //Example: LoginStyles.logo('MAX');
  static LOGO_MAX_HEIGHT_KEYWORD = 'MAX';
  static LOGO_MIN_HEIGHT_KEYWORD = 'MIN';



  static wrapper = function() {
    return {
      flex: 1
    }
  }

  static container = function() {
    return {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ededed',
      paddingLeft: 40,
      paddingRight: 40
    }
  }

  static keyboardAvoidingView = function() {
    return {
      justifyContent: 'center',
      alignItems: 'center'
    }
  }

  static logo = function(state) {
    //state = 'MAX' => logo maximum size / state = 'MIN' => logo minimum size
    if(state === this.LOGO_MAX_HEIGHT_KEYWORD)
    {
      return {
        height: this.LOGO_MAX_HEIGHT
      }
    }
    else if(state === this.LOGO_MIN_HEIGHT_KEYWORD)
    {
      return {
        height: this.LOGO_MIN_HEIGHT
      }
    }
  }

  static infoPanel = function() {
    return {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#f9634f',
      paddingBottom: 20,
      alignSelf: 'stretch'
    }
  }

  static logInButton = function() {
    return {
      width: '80%',
      alignItems: 'center',
      borderRadius: 10,
      padding: 20,
      backgroundColor: '#01c853'
    }
  }

  static registerButton = function () {
    return {
      width: '80%',
      alignItems: 'center',
      borderRadius: 10,
      padding: 20,
      backgroundColor: '#01c853',
    }
  }

  static logInButtonText = function () {
    return {
      color: '#fff',
      fontSize: 16,
    }
  }

  static registerButtonText = function () {
    return {
      color: '#fff',
      fontSize: 16,
    }
  }
}
