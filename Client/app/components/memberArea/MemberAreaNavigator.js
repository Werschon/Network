import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import InstantViewPage from './InstantView';

const Navigator = createStackNavigator({
  InstantView: {
    screen: InstantViewPage
  }
},{
  initialRouteName: 'InstantView'
});

export default Navigator;
