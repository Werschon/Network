import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Login from './app/components/login/Login';
import MemberAreaNavigator from './app/components/memberArea/MemberAreaNavigator';
import Meteor from 'react-native-meteor';

Meteor.connect('ws://localhost:3000/websocket', (err, res) => {
  if(err)
  {
    console.log("Could not connect to server reached");
    console.log(err);
  }
});

const Application = createStackNavigator({
  Login: { screen: Login},
  MemberArea: { screen: MemberAreaNavigator }
},{
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
});

export default Application;
