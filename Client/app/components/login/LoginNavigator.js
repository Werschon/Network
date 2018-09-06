import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from './Login';
import Register from './Register';

//TODO Remove line below
import KeyboardTest from './KeyboardIssueTest';

//TODO change 'screen: KeyboardTest' to 'screen: Login'
const Navigator = createStackNavigator({
  Login: {
    screen: KeyboardTest
  },
  Register: {
    screen: Register
  }
},{
  initialRouteName: 'Login'
});

export default Navigator;
