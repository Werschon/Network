

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
  Keyboard
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
    }

    this.LogoHeight = new Animated.Value(LoginStyles.logo('MAX').height);
  }

  componentWillMount() {
    //KeyboardListener to manage visible objects when keyboard shows up
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);

    //Starting timer which checks server- and internet-connection every second
    let this_ = this;
    var timer = new Timer(this_.updateConnectionStatus, 1000);
    this.setState({connectionUpdateTimer: timer}, () =>
    this.state.connectionUpdateTimer.start());
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();

    this.state.connectionUpdateTimer.stop();
  }

  render() {
    return (

      <View style={LoginStyles.container()}>

      <KeyboardAvoidingView behavior='padding' enabled>

        <Animated.Image source={this.state.logo} style={{transform: {scaleY: this.animatedValue.interpolate({
          
        })}}} />

        <Text style={LoginStyles.infoPanel()}>{this.state.infoPanelText}</Text>

        <TextInput  style={DefaultComponentStyles.textInput(this.state.textInputWrong)}
                    placeholder='Username'
                    onChangeText={(username) => { this.setState({username: username});
                                                  //if(this.state.textInputStyle == styles.textInputWrong){
                                                  //  this.setState({textInputStyle: styles.textInput});
                                                  //}
                                                }
                                  }
                    value={this.state.username}
                    underlineColorAbdroid='transparent'/>

        <TextInput  style={DefaultComponentStyles.textInput(this.state.textInputWrong)}
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

      </KeyboardAvoidingView>

      <View>

        <TouchableOpacity style={LoginStyles.logInButton()} onPress={this.login}>
          <Text style={LoginStyles.logInButtonText()}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={LoginStyles.registerButton()} onPress={this.register}>
          <Text style={LoginStyles.registerButtonText()}>Register</Text>
        </TouchableOpacity>

      </View>

      </View>);
  }

  keyboardDidShow = (event) => {
    var _duration = event.duration;
    var _toValue = LoginStyles.logo('MIN').height;

    Animated.timing(this.LogoHeight, {
      duration: _duration,
      toValue: _toValue,
    }).start();
  }

  keyboardDidHide = (event) => {

    //console.log(event);
    /*var _duration = event.duration;
    var _toValue = LoginStyles.logo('MAX').height;

    Animated.timing(this.LogoHeight, {
      duration: _duration,
      toValue: _toValue,
    }).start();*/
  }

  login = () => {
    Promise.all([SecurityUtility.hash256(this.state.username), SecurityUtility.hash256(this.state.password)])
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
    this.props.navigation.navigate('Register');
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
