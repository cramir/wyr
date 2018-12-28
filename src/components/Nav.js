import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';


const Nav = ({ authedUser, logOut }) => (
  <nav className="nav">
    <NavLink to="/" exact className="nav-link" activeClassName="active">Home</NavLink>
    <NavLink to="/add" className="nav-link" activeClassName="active">New Question</NavLink>
    <NavLink to="/leaderboard" className="nav-link" activeClassName="active">Leaderdoard</NavLink>
    {authedUser === null ? null : (
      <div className="logged-in">
        <span className="user-name">{authedUser}</span>
        <Link to="/" onClick={logOut}>Logout</Link>
      </div>
    )}
  </nav>
);

Nav.propTypes = {
  authedUser: PropTypes.string,
  logOut: PropTypes.func.isRequired,
};

Nav.defaultProps = {
  authedUser: null,
};


export default Nav;
