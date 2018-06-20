import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './app/components/Login';
import Profile from './app/components/Profile';
import Meteor from 'react-native-meteor';

Meteor.connect('ws://192.168.178.74:3000/websocket');

const Application = StackNavigator({
  Home: { screen: Login},
  Profile: { screen: Profile }
},{
    navigationOptions: {
      header: false,
    }
})

export default class App extends React.Component {
  render() {
    return (
      <Application />
    );
  }
}
