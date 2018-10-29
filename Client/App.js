import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import LoginNavigator from './app/components/login/LoginNavigator';
import MemberAreaNavigator from './app/components/memberArea/MemberAreaNavigator';
import Meteor from 'react-native-meteor';
import SystemParameters from './app/components/system/SystemParameters';

Meteor.connect('ws://192.168.0.25:3000/websocket', (err, res) => {
  if(err)
  {
    console.log("Could not connect to server reached");
    console.log(err);

  }
});

systemParameters = new SystemParameters();

const Application = createStackNavigator({
  Login: { screen: LoginNavigator },
  MemberArea: { screen: MemberAreaNavigator }
},{
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
});

export default Application;
