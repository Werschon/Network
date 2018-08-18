import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  NetInfo
} from 'react-native';
import Meteor from 'react-native-meteor';
import SecurityUtility from '../util/SecurityUtility';
import LoginStyles from '../styles/LoginStyles';
import DefaultComponentStyles from '../styles/DefaultComponentStyles';
import LoginErrorMessages from '../text/errorMessages/LoginErrorMessages';
import connect from 'react-watcher';
import Timer from '../util/Timer';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernmae: '',
      password: '',
      connected: false,
      infoPanelText:'',
      textInputWrong: false,
      connectionUpdateTimer: ''
    }
  }

  componentDidMount() {
    let this_ = this;
    var timer = new Timer(this_.updateConnectionStatus, 1000);
    this.setState({connectionUpdateTimer: timer}, () =>
    this.state.connectionUpdateTimer.start());
  }

  componentWillUnmount() {
    if(this.state.connectionUpdateTimer !== 'undefined') {
      this.state.connectionUpdateTimer.stop();
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={LoginStyles.wrapper()}>
        <View style={LoginStyles.container()}>

          <Text style={LoginStyles.header()}>- LOGO -</Text>

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

          <TouchableOpacity style={LoginStyles.logInButton()} onPress={this.login}>
            <Text style={LoginStyles.logInButtonText()}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={LoginStyles.registerButton()} onPress={this.register}>
            <Text style={LoginStyles.registerButtonText()}>Register</Text>
          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>);
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
    //console.log(Meteor.status().status);

  }
}
