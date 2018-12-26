import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Question from './Question';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { showAnswered: true };
  }

  handleClick = () => {
    this.setState(prev => ({ showAnswered: !prev.showAnswered }));
  };

  render() {
    const { questionsIds, answeredQuestions } = this.props;
    const { showAnswered } = this.state;
    return (
      <div>
        <h3>this is the dashboard</h3>
        <button type="button" onClick={this.handleClick}>{showAnswered ? 'Show Unanswered' : 'Show Answered'}</button>
        <ul>
          {showAnswered ? questionsIds.reduce((acc, i) => {
            if (Object.prototype.hasOwnProperty.call(answeredQuestions, i)) {
              acc.push((
                <li key={i}>
                  <Question id={i} />
                </li>));
            }
            return acc;
          }, [])
            : questionsIds.reduce((acc, i) => {
              if (!Object.prototype.hasOwnProperty.call(answeredQuestions, i)) {
                acc.push((
                  <li key={i}>
                    <Question id={i} />
                  </li>));
              }
              return acc;
            }, [])}
        </ul>
      </div>
    );
  }
}

Dashboard.propTypes = {
  questionsIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  answeredQuestions: PropTypes.object,
};

function mapStateToProps({ questions, users, authedUser }) {
  return {
    questionsIds: Object.keys(questions)
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestions: authedUser ? users[authedUser].answers : {},
  };
}

export default connect(mapStateToProps)(Dashboard);
