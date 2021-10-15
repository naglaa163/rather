import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Question from './Questions'
class Dashboard extends Component {
    state = {
        viewAnswered: false
        
    }
    fQuestions = (viewReply) => {
        this.setState((state) => {
            return { viewReply: viewReply }
        })
        
    }
    render() {
        const { viewReply} = this.state;

        
        const { questions, authedUser } = this.props
        const answeredquestions = Object.values(questions)
        const fQuestions =  answeredquestions.filter(function(question) {
        
            const content = (
            question.optionOne.votes.indexOf(authedUser) > -1 ||
            question.optionTwo.votes.indexOf(authedUser) > -1
            );
            return viewReply ? content : !content;
        });
        const typeQuestions = fQuestions.sort((a, b) => b.timestamp - a.timestamp);
        return (
            <div>
                <div className="botoon">
                    <button className={ !viewReply ? 'boton-chose' : 'boton'} onClick={(e) => this.fQuestions(false)}>Unanswered Questions</button>
                    <button className={ viewReply ? 'boton-chose' : 'boton'} onClick={(e) => this.fQuestions(true)}>Answered Questions</button>
                </div>

                <ul className="quest-list">
                    {typeQuestions.map((question) => (
                        <li key={question.id}>
                            <Link to={`question/${question['id']}`}>
                                <Question id={question.id}/>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps( { questions, authedUser }) {
    return {
        authedUser,
        questions,
    }
}

export default connect(mapStateToProps)(Dashboard);