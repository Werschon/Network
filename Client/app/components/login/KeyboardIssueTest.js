

import React from 'react';
import { Keyboard, TextInput } from 'react-native';

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
      <View style={{alignItems: 'center'}}>
        <TextInput placeholder='Test'/>
      </View>);
  }
}
