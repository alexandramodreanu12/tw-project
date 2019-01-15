import React, { Component } from 'react';
import LoginMain from './LoginMain'
import AppMain from './AppMain'

class App extends Component {
  state = {
    isLogin: true,
    user: {}
  }

  constructor(props, context) {
    super(props, context);

    this.showAppMain = this.showAppMain.bind(this);
  }

  showAppMain(user) {
    this.setState({ isLogin: false, user: user });
  }

  render() {
    return (
      <div className="App">
        {
          this.state.isLogin ?
            <LoginMain showAppMain={this.showAppMain}></LoginMain> :
            <AppMain user={this.state.user}></AppMain>
        }
      </div>
    );
  }
}

export default App;
