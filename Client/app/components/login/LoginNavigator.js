import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from './Login';
import Register from './Register';

//TODO Remove line below after Keyboard-Test on Android (see TODO in KeyboardIssueTest.js)
import KeyboardTest from './KeyboardIssueTest';

//TODO To test KeyboardIssue.js change 'screen: Login' to 'screen: KeyboardTest'
const Navigator = createStackNavigator({
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  }
},{
  initialRouteName: 'Login'
});

export default Navigator;
