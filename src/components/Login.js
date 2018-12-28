import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authUser';

class Login extends Component {
    handleClick = (e) => {
      const { dispatch } = this.props;
      e.preventDefault();
      dispatch(setAuthedUser(e.target.getAttribute('data-id')));
    };

    render() {
      const { users } = this.props;
      return (
        <div className="login">
          <h1 className="heading">Login</h1>
          <h5 className="subhead">Select a user to login</h5>
          <div className="user-list">
            {Object.keys(users).map(user => (
              <div className="user" key={user} role="presentation" onClick={this.handleClick} data-id={user}>
                <img className="user-icon" src={users[user].avatarURL} alt="" data-id={user} />
                <span data-id={user}>{user}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
}

Login.propTypes = {
  users: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};


function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Login);
