import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';


const Nav = ({ authedUser, logOut }) => (
  <nav className="nav">
    <NavLink to="/" exact activeClassName="active">Home</NavLink>
    <NavLink to="/add" activeClassName="active">New Question</NavLink>
    <NavLink to="/leaderboard" activeClassName="active">Leader Boards</NavLink>
    {authedUser === null ? null : (
      <Fragment>
        <span>{authedUser}</span>
        <Link to="/" onClick={logOut}>Logout</Link>
      </Fragment>
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
