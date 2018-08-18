import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from './Login';
import Register from './Register';

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
