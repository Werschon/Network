import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView,
         TouchableOpacity, AsyncStorage} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      usernmae: '',
      password: '',
    }
  }

  componentDidMount(){
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {

    var value = await AsyncStorage.getItem('user');
    if(value !== null){
      this.props.navigation.navigate('Profile');
    }

  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>

        <View style={styles.container}>

          <Text style={styles.header}>- LOGIN -</Text>

          <TextInput
            style={styles.textInput} placeholder='Username'
            onChangeText={ (username) => this.setState({username}) }
            underlineColorAbdroid='transparent'
          />

          <TextInput
            style={styles.textInput} placeholder='Password'
            onChangeText={ (password) => this.setState({password}) }
            secureTextEntry={ true }
            underlineColorAbdroid='transparent'
          />

          <TouchableOpacity style={styles.button} onPress={this.login}>
            <Text>Log in</Text>
          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>
    );
  }

  login = () => {
    console.log(Meteor.call('loginTest'));
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2896d3',
    paddingLeft: 40,
    paddingRight: 40,
  },
  header: {
    fontSize: 24,
    marginBottom: 60,
    color: '#fff',
    fontWeight: 'bold',
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    alignSelf: 'stretch',
    backgroundColor: '#01c853',
    padding: 20,
    alignItems: 'center',
  }
})
