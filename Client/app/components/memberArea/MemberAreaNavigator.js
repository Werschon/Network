import React from 'react';
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
