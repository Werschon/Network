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
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ededed',
      paddingHorizontal: 40
    }
  }

  static logoContainer = function() {
    return {
      flexDirection: 'row',
      height: '20%',
      paddingBottom: 20
    }
  }

  static logo = function() {
    return {
      flex: 1,
      alignSelf: 'stretch',
      width: undefined,
      height: undefined
    }
  }

  static keyboardAvoidingView = function() {
    return {
      alignItems: 'center',
      alignSelf: 'stretch'
    }
  }

  static infoPanel = function() {
    return {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#f9634f',
      paddingBottom: 20
    }
  }

  static textInput = function(textInputWrong){
    textColor = '#000000';
    if(textInputWrong){
      textColor = '#ed4242';
    }
    return {
      alignSelf: 'stretch',
      color: textColor,
      borderColor: 'gray'
    }
  }

  static logInButtonContainer = function() {
    return {
      flexDirection: 'row',
    }
  }

  static logInButton = function() {
    return {
      width: '80%',
      height: '10%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      paddingVertical: 20,
      marginVertical: 10,
      backgroundColor: '#01c853'
    }
  }

  static logInButtonText = function () {
    return {
      color: '#fff',
      textAlignVertical: "center",
      textAlign: "center",
    }
  }

  static registerButton = function () {
    return {
      width: '80%',
      alignItems: 'center',
      borderRadius: 20,
      padding: 20,
      backgroundColor: '#01c853',
    }
  }

  static registerButtonText = function () {
    return {
      color: '#fff',
      fontSize: 16,
    }
  }

  static otherServicesSeparationLineContainer = function() {
    return {
      width: undefined,
      alignSelf: 'stretch',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  }

  static otherServicesSeparationLine = function() {
    return {
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      width: '45%',
      alignSelf: 'center'
    }
  }

  static otherServicesSeparationText = function() {
    return {
      color: 'gray',
      textAlignVertical: "center",
      textAlign: "center",
      justifyContent: 'center'
    }
  }

  static otherServicesSymbolsView = function () {
    return {
      width: undefined,
      alignSelf: 'stretch',
      height: '5%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }
  }

  static otherServicesSymbolsTO = function() {
    return {
      width: undefined,
      height: undefined,
      alignSelf: 'stretch',
      flex: 1,
      flexDirection: 'row'
    }
  }

  static otherServicesSymbols = function () {
    return {
      flex: 1,
      alignSelf: 'stretch',
      width: undefined,
      height: undefined
    }
  }
}
