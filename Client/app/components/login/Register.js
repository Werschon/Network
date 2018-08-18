import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import LoginStyles from '../styles/LoginStyles';
import DefaultComponentStyles from '../styles/DefaultComponentStyles';
import LoginText from '../text/text/LoginText';

export default class Register extends React.Component {
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

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={LoginStyles.wrapper()}>
        <View style={LoginStyles.container()}>
          <Text style={LoginStyles.header()}>- LOGO -</Text>

          <Text style={DefaultComponentStyles.descriptionPanel()}>{LoginText.instruction1()}</Text>

          <TextInput  style={DefaultComponentStyles.textInput(this.state.textInputWrong)}
                      placeholder='Username' //TODO LoginText.usernamePlaceholder();
                      onChangeText={(username) => { this.setState({username: username});
                                                    //if(this.state.textInputStyle == styles.textInputWrong){
                                                    //  this.setState({textInputStyle: styles.textInput});
                                                    //}
                                                  }
                                    }
                      value={this.state.username}
                      underlineColorAbdroid='transparent'/>

          <Text style={DefaultComponentStyles.descriptionPanel()}>{LoginText.instruction2()}</Text>

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

          <Text style={DefaultComponentStyles.descriptionPanel()}>{LoginText.instruction3()}</Text>

          <TouchableOpacity style={LoginStyles.logInButton()} onPress={this.login}>
            <Text style={LoginStyles.logInButtonText()}>Log In</Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>);
  }
}
