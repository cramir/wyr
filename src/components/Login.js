import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authUser';

class Login extends Component {
    handleClick = (e) => {
      const { dispatch } = this.props;
      e.preventDefault();
      dispatch(setAuthedUser(e.target.id));
    };

    render() {
      const { users } = this.props;
      return (
        <div>
          <ul>
            {Object.keys(users).map(user => (
              <li key={user}>
                <span role="presentation" onClick={this.handleClick} id={user}>{user}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }
}

Login.propTypes = {
};


function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Login);
