import { Meteor } from 'meteor/meteor';

Meteor.methods({
  abc: function() {
    var result = {};
    result.foo = "Hello";
    return result;
  }
});
