import React from 'react';
import { connect } from 'react-redux';

const Question = (props) => {
  const { author, question } = props;

  return (
    <div className="text-list">
      <div className="titles">
        <div className="text">
          <img alt="avatar" className="avatar" src={`${author.avatarURL}`} />
        </div>

        <div className="poll-main">
          <h3 className="text-header">{author.name} asks</h3>
          <div className="rather">Would you rather</div>
          <div className="poll-text">{question.optionOne.text}</div>
          <button className="boton">View Question</button>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  const author = question ? users[question.author] : null;

  return {
    authedUser,
    question,
    author
  };
}

export default connect(mapStateToProps)(Question)