import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Question from './Question';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { showAnswered: false };
  }

  handleClick = () => {
    this.setState(prev => ({ showAnswered: !prev.showAnswered }));
  };

  render() {
    const { questionsIds, answeredQuestions } = this.props;
    const { showAnswered } = this.state;
    return (
      <div className="dashboard">
        <h1>Would you rather?</h1>
        <button className="dashboard-toggle" type="button" onClick={this.handleClick}>{showAnswered ? 'Show Unanswered' : 'Show Answered'}</button>
        {showAnswered ? questionsIds.reduce((acc, i) => {
          if (Object.prototype.hasOwnProperty.call(answeredQuestions, i)) {
            acc.push((<Question id={i} key={i} />));
          }
          return acc;
        }, [])
          : questionsIds.reduce((acc, i) => {
            if (!Object.prototype.hasOwnProperty.call(answeredQuestions, i)) {
              acc.push((<Question id={i} key={i} />));
            }
            return acc;
          }, [])}

      </div>
    );
  }
}

Dashboard.propTypes = {
  questionsIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  answeredQuestions: PropTypes.shape({
    answers: PropTypes.object,
  }).isRequired,
};

function mapStateToProps({ questions, users, authedUser }) {
  return {
    questionsIds: Object.keys(questions)
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestions: authedUser ? users[authedUser].answers : {},
  };
}

export default connect(mapStateToProps)(Dashboard);
