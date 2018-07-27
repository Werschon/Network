import { Meteor } from 'meteor/meteor';

Meteor.methods({
  checkUser: function(username, password) {
    var result = {username: false, password: false};

    if(username == "User1") {
      result.username = true;
    }
    if(password == "12345"){
      result.password = true
    }

    return result;
  }
});
