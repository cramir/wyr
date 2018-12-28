import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Leaderboard = ({ users, sorted }) => (
  <div className="leaderboard">
    <h1 className="heading">Leaderboards</h1>
    <ol>
      {sorted.map(user => (
        <li key={user} className="user">
            <img src={users[user].avatarURL} alt="" className="user-image" />
            <span>{users[user].id}</span>
          <ul>
            <li>Questions answered: {Object.keys(users[user].answers).length}</li>
            <li>Questions asked: {users[user].questions.length}</li>
          </ul>
        </li>
      ))}
    </ol>
  </div>
);

Leaderboard.propTypes = {
  users: PropTypes.object,
  sorted: PropTypes.array.isRequired,
};

function mapStateToProps({ users }) {
  const sorted = Object.keys(users)
    .sort((a, b) => (users[a].questions.length
        + Object.keys(users[a].answers).length)
        - (users[b].questions.length + Object.keys(users[a].answers).length));
  return {
    users,
    sorted,
  };
}

export default connect(mapStateToProps)(Leaderboard);
