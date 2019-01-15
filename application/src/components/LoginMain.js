import React, { Component } from 'react';
import Register from './Register'
import Login from './Login'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUser, addUser } from '../actions'

const mapStateToProps = function (state) {
  return {
    userDetails: state.user
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    actions: bindActionCreators({
      getUser,
      addUser
    }, dispatch)
  }
}

class LoginMain extends Component {
    state = {
        isAdding: false
    }

    constructor(props) {
        super(props);

        this.isAddingTrue = this.isAddingTrue.bind(this);
        this.isAddingFalse = this.isAddingFalse.bind(this);
        this.addNewUser = this.addNewUser.bind(this);
        this.login = this.login.bind(this);
    }
    
    addNewUser(userDetails) {
        this.props.actions.addUser(userDetails)
    }

    login(username, password) {
        const me = this;
        this.props.actions.getUser(username, password).then(() => {
          if (me.props.userDetails !== {}) {
            me.props.showAppMain(me.props.userDetails);
          }
        });
    }

    isAddingTrue() {
        this.setState({ isAdding: true });
    }

    isAddingFalse() {
        this.setState({ isAdding: false });
    }

    render() {
        return (
            <div>
                {this.state.isAdding ?
                    <Register addNewUser={this.addNewUser}
                        isAddingFalse={this.isAddingFalse} /> :
                    <Login login={this.login} isAddingTrue={this.isAddingTrue} />
                }
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(LoginMain);
