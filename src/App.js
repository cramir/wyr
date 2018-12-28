import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import PropTypes from 'prop-types';
import { handleInitialData } from './actions/shared';
import Dashboard from './components/Dashboard';
import NewQuestion from './components/NewQuestion';
import QuestionPage from './components/QuestionPage';
import Nav from './components/Nav';
import Login from './components/Login';
import { logoutUser } from './actions/authUser';
import Leaderboard from './components/Leaderboard';
import NotFound from './components/NotFound';
import './App.scss';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  logOut = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };


  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav authedUser={authedUser} logOut={this.logOut} />
            {authedUser ? (
              <div>
                <Switch>
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/question/:id" component={QuestionPage} />
                  <Route path="/add" component={NewQuestion} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            )
              : <Login />
                  }
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authedUser: PropTypes.string,
};

export default connect(mapStateToProps)(App);
