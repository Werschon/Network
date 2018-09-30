
//TODO Auf Android testen, ob bei keyboadDidHide das event null ist (Zeile 24). Auf IOS funktioniert alles einwandfrei

import React from 'react';
import { Keyboard, TextInput, View } from 'react-native';

export default class KeyboardIssueTest extends React.Component {

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow = (event) => {
    console.log(event);
  }

  keyboardDidHide = (event) => {
    console.log(event);
  }

  render() {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <TextInput style={{alignSelf: 'stretch', padding: 16, backgroundColor: '#fff'}} placeholder='Test'/>
      </View>);
  }
}
