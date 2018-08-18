import React from 'react';

export default class LoginStyles {
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
  static header = function() {
    return {
      fontSize: 24,
      marginBottom: 60,
      color: '#01c853',
      fontWeight: 'bold',
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
