import React from 'react';
import DeviceInfo from 'react-native-device-info';

export default class SystemParameters extends React.Component {
  constructor(props, context) {
    super(props);
    let lang = DeviceInfo.getDeviceLocale();

    this.state = {
      language: lang
    }
  }

/*  getLanguage = () => {
    return this.state.language;
  }*/
}
