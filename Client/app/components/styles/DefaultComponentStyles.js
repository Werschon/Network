import React from 'react'

export default class DefaultComponentStyles {

  static textInput = function(textInputWrong){
    textColor = '#000000';
    if(textInputWrong){
      textColor = '#ed4242';
    }
    return {
      alignSelf: 'stretch',
      flexDirection: 'row',
      padding: 16,
      marginBottom: 20,
      backgroundColor: '#fff',
      color: textColor
    }
  }

  static descriptionPanel = function() {
    return {
      fontSize: 12,
      fontWeight: 'bold',
      textColor: '#000000',
      paddingBottom: 20,
      alignSelf: 'stretch'
    }
  }
}
