

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  NetInfo,
  Image,
  Animated,
  Keyboard,
  Platform
} from 'react-native';
import Meteor from 'react-native-meteor';
import SecurityUtility from '../util/SecurityUtility';
import LoginStyles from '../styles/LoginStyles';
import DefaultComponentStyles from '../styles/DefaultComponentStyles';
import LoginErrorMessages from '../text/errorMessages/LoginErrorMessages';
import connect from 'react-watcher';
import Timer from '../util/Timer';

/*
  The height of the logo is managed in LoginStyles.logo
*/

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      usernmae: '',
      password: '',
      connected: false,
      infoPanelText:'',
      textInputWrong: false,
      connectionUpdateTimer: '',
      logo: require('../../resource/test_logo.png'),
      facebookSymbol: require('../../resource/facebook_symbol.png'),
      googleSymbol: require('../../resource/google_plus_symbol.png'),
      foodNetworkSymbol: require('../../resource/food_network_symbol.png'),
      settingsSymbol: require('../../resource/settings_symbol.png')
    }
  }

  componentWillMount() {
    //Starting timer which checks server- and internet-connection every second
    let this_ = this;
    var timer = new Timer(this_.updateConnectionStatus, 1000);
    this.setState({connectionUpdateTimer: timer}, () =>
    this.state.connectionUpdateTimer.start());
  }

  componentWillUnmount() {
    this.state.connectionUpdateTimer.stop();
    //<Image source={this.state.logo} style={LoginStyles.logo()} resizeMode='contain'/>
  }

  render() {
    return (
      <View style={LoginStyles.container()}>

        <View style={LoginStyles.logoContainer()}>
          <Image source={this.state.logo} style={LoginStyles.logo()} resizeMode='contain'/>
        </View>

        <Text style={LoginStyles.infoPanel()}>{this.state.infoPanelText}</Text>

        <KeyboardAvoidingView style={LoginStyles.keyboardAvoidingView()} behavior="padding">

          <TextInput  style={LoginStyles.textInput(this.state.textInputWrong)}
                      placeholder='Username'
                      onChangeText={(username) => { this.setState({username: username});
                                                    //if(this.state.textInputStyle == styles.textInputWrong){
                                                    //  this.setState({textInputStyle: styles.textInput});
                                                    //}
                                                  }
                                    }
                      value={this.state.username}
                      underlineColorAbdroid='transparent'/>

          <TextInput  style={LoginStyles.textInput(this.state.textInputWrong)}
                      placeholder='Password'
                      onChangeText={(password) => { this.setState({password});
                                                    //if(this.state.textInputStyle == styles.textInputWrong){
                                                  //    this.setState({textInputStyle: styles.textInput});
                                                  //  }
                                                  }
                                    }
                      value={this.state.password}
                      secureTextEntry={true}
                      underlineColorAbdroid='transparent'/>

          <View style={LoginStyles.logInButtonContainer()}>

            <TouchableOpacity style={LoginStyles.logInButton()} onPress={this.login}>
              <Text adjustsFontSizeToFit numberOfLines={1} style={LoginStyles.logInButtonText()}>Log In</Text>
            </TouchableOpacity>

          </View>

          <View style={LoginStyles.otherServicesSeparationLineContainer()}>
            <View style={LoginStyles.otherServicesSeparationLine()}/>
            <Text style={LoginStyles.otherServicesSeparationText()}>or</Text>
            <View style={LoginStyles.otherServicesSeparationLine()}/>
          </View>

        </KeyboardAvoidingView>

        <View style={LoginStyles.otherServicesSymbolsView()}>
          <TouchableOpacity style={LoginStyles.otherServicesSymbolsTO()}>
            <Image source={this.state.googleSymbol} style={LoginStyles.otherServicesSymbols()} resizeMode='contain'/>
          </TouchableOpacity>

          <TouchableOpacity style={LoginStyles.otherServicesSymbolsTO()}>
            <Image source={this.state.facebookSymbol} style={LoginStyles.otherServicesSymbols()} resizeMode='contain'/>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.register} style={LoginStyles.otherServicesSymbolsTO()}>
            <Image source={this.state.foodNetworkSymbol} style={LoginStyles.otherServicesSymbols()} resizeMode='contain'/>
          </TouchableOpacity>

          <TouchableOpacity style={LoginStyles.otherServicesSymbolsTO()}>
            <Image source={this.state.settingsSymbol} style={LoginStyles.otherServicesSymbols()} resizeMode='contain'/>
          </TouchableOpacity>
        </View>

      </View>
    );
  }

  login = () => {
    Promise.all([SecurityUtility.hash256(this.state.username), SecurityUtility.hash256(this.state.password)])//PETER WAR HIT_VERT_OFFSET_PX
      .then(allData => {
        console.log(allData);
        Meteor.call('checkUser', allData[0], allData[1] ,(err, data) => {
          if (err){
            console.log(err);
          }

          if(data.username == true && data.password == true) {
            this.props.navigation.navigate('MemberArea');
          }
          else {
            this.setState({textInputWrong: true});
            this.setState({infoPanelText: LoginErrorMessages.wrongPasswordOrUsername(this.props.language)});
          }
        });
      });
  }

  register = () => {
    console.log("Register reached");
    console.log("****************");
    //this.props.navigation.navigate('Register');
  }

  updateConnectionStatus = () => {
    NetInfo.getConnectionInfo().then((deviceConnectionStatus) => {
      //If device has no internet connection
      if(deviceConnectionStatus.type != 'wifi' &&
         deviceConnectionStatus.type != 'cellular' &&
         deviceConnectionStatus.type != 'unknown')
      {
        this.setState({connected: false});
        this.setState({infoPanelText: LoginErrorMessages.noInternetConnection(this.props.language)});
      }

      //If device has internet connection => Check if Server is reachable
      else
      {
        if(Meteor.status().status === 'disconnected')
        {
          this.setState({connected: false});
          this.setState({infoPanelText: LoginErrorMessages.cantReachServer(this.props.language)});
        }
        else if(Meteor.status().status === 'connected')
        {
          if(this.state.connected == false)
          {
            this.setState({infoPanelText: ''});
            this.setState({connected: true});
          }
        }
      }

    });
  }
}
