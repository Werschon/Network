import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Meteor from 'react-native-meteor';
import { sha256 } from 'react-native-sha256';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernmae: '',
      password: '',
      connected: Meteor.status().connected,
      infoPanelText: '',
      textInputWrong: false,
    }
  }

  /*componentDidMount() {
    this._loadInitialState().done();
  }

/*  _loadInitialState = async () => {

    var value = await AsyncStorage.getItem('user');
    if (value !== null) {
      this.props.navigation.navigate('Profile');
    }

  }*/

  render() {
    return (<KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
      <View style={styles.container}>

        <Text style={styles.header}>- LOGO -</Text>

        <Text style={styles.infoPanel}>{this.state.infoPanelText}</Text>

        <TextInput  style={this.getTextInputStyle()}
                    placeholder='Username'
                    onChangeText={(username) => { this.setState({username: username});
                                                  //if(this.state.textInputStyle == styles.textInputWrong){
                                                  //  this.setState({textInputStyle: styles.textInput});
                                                  //}
                                                }
                                  }
                    underlineColorAbdroid='transparent'/>

        <TextInput  style={this.getTextInputStyle()}
                    placeholder='Password'
                    onChangeText={(password) => { this.setState({password});
                                                  //if(this.state.textInputStyle == styles.textInputWrong){
                                                //    this.setState({textInputStyle: styles.textInput});
                                                //  }
                                                }
                                  }
                    secureTextEntry={true}
                    underlineColorAbdroid='transparent'/>

        <TouchableOpacity style={styles.logInButton} onPress={this.login}>
          <Text style={styles.logInButtonText}>Log In</Text>
        </TouchableOpacity>

      </View>

    </KeyboardAvoidingView>);
  }

  login = () => {
    Promise.all([this.hash(this.state.username), this.hash(this.state.password)])
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
          }
        });
      });
  }

  hash = (stringToEncrypt) => {
    return sha256(stringToEncrypt).then( hash => {
        return hash;
      })
  }

  getTextInputStyle = () => {
    if(this.state.textInputWrong == false){
      return styles.textInput;
    }
    else {
      return styles.textInputWrong;
    }
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ededed',
    paddingLeft: 40,
    paddingRight: 40
  },
  header: {
    fontSize: 24,
    marginBottom: 60,
    color: '#01c853',
    fontWeight: 'bold'
  },
  infoPanel: {
    fontSize: 12,
    color: '#f9634f'
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#000000'
  },
  textInputWrong: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#ed4242'
  },
  logInButton: {
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#01c853',

  },
  logInButtonText: {
    color: '#fff',
    fontSize: 16,
  }
})
