import React from 'react';

export default class LoginErrorMessages {

  static cantReachServer = function(language) {
    return "Leider kann der Server gerade nicht erreicht werden 😭" +
    "Versuche es etwas später nochmal";
  }

  static noInternetConnection = function(language) {
    return "Ist dein Gerät auch wirklich mit dem Internet verbunden? 🤔" +
    "Überprüfe deine Internetverbindung und versuche es dann nochmal";
  }

  static wrongPasswordOrUsername = function(language) {
    return "Der eingegebene Nutzername oder das Passwort ist falsch";
  }
}
