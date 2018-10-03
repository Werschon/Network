import React from 'react';

export default class Timer extends React.Component {
  constructor(functionToCall, interval_millisec) {
    let props = {functionToCall, interval_millisec};
    super(props);
  }

  start() {
    this.interval = setInterval(() => this.callFunction(), this.props.interval_millisec);
  }

  callFunction(){
    this.props.functionToCall();
  }

  stop() {
    clearInterval(this.interval);
  }
}
