

import React, { Component } from 'react';
import { connect } from 'react-redux'
import {resievedAddReply } from '../actions/questions'
import { Redirect } from 'react-router-dom';

class PollPage extends Component {
    state = {
        chosedReply: ''
    }
    handleSaveAnswer(event) {
        event.preventDefault()

        const { dispatch, authedUser, id  } = this.props
        const { chosedReply } = this.state
    
        dispatch(resievedAddReply({
          qid:id,
          authedUser,
          answer: chosedReply,
        }))
    
    }
    choosedReply = (answer) => {
        this.setState((previousState) => {
            return {chosedReply: answer}
        })
    }
    render() {
        const { question, author, answered, answer ,optionTwo,optionOne} = this.props;
        
        const voteOne = question.optionOne.votes.length
        const voteTwo = question.optionTwo.votes.length
        const voteslength = voteOne +  voteTwo
        const  percentageOptionOne = (voteOne / (voteslength) * 100).toFixed(2)
        const percentageOptionTwo = (voteTwo / (voteslength) * 100).toFixed(2)
        const {chosedReply } = this.state;
        if (!question) {
            return <Redirect to="/not-found"/>
        }

        return (
            <div className={answered ? 'text-list poll-content' : 'text-list'}>
            {answered ? (
                    <div className="center-text">Asked by {author.name}</div>
                ) : (
                    <div className="center-text">{author.name} asks</div>
                )}
                <div className="text-main">
                    <div className="text">
                        <img alt="avatar" className="avatar" src={`/${author.avatarURL}`}/>
                    </div>
                    
                    {!answered ? (
                        <div className="poll-main">
                            <div className="rather">Would you rather</div>
                            <div className={chosedReply === 'optionOne' ? 'option option-selected' : 'option'} onClick={(e) => { this.choosedReply('optionOne')}}>{question.optionOne.text}</div>
                            <div className={chosedReply   === 'optionTwo' ? 'option option-selected' : 'option'} onClick={(e) => { this.choosedReply('optionTwo')}}>{question.optionTwo.text}</div>
                            <button className={ chosedReply ? 'boton' : 'disabled'} onClick={(e) => {this.handleSaveAnswer(e)}}>Submit</button>
                        </div>
                    ): (
                        <div className="poll-main">
                            <div className="rather">Results: </div>
                            <div className={answer === 'optionOne' ? 'contents chosed': 'contents'}>
                                <div className="option-one">{optionOne}</div>

                                <div className="cont">
                                    <div>{voteOne} out of {voteslength} votes</div>
                                    <div>Percentage votes: {percentageOptionOne}%</div>
                                </div>
                                <div className="votes">Your choice</div>
                            </div>

                            <div className={answer === 'optionTwo' ? 'contents chosed': 'contents'}>
                                <div className="option-two">{optionTwo}</div>

                                <div className="cont">
                                    <div>{voteTwo} out of {voteslength} votes</div>
                                    <div>Percentage votes: {percentageOptionTwo}%</div>
                                </div>
                                <div className="votes">Your choice</div>
                            </div>
                        </div>
                    )}
                    
                </div>
            </div>
        )
    }
}

function mapStateToProps ({authedUser, users, questions}, { match }) {
    const { id } = match.params
    const question = questions[id]
    const author = question ? users[question.author] : null
    const  optionOneVotes = question.optionOne.votes.includes(authedUser)
    const optionTwoVotes = question.optionTwo.votes.includes(authedUser)
    const answered = question?(optionOneVotes || optionTwoVotes) : false
    const optionOne = question.optionOne.text
    const optionTwo = question.optionTwo.text
   

    const answer = users[authedUser].answers[id]
  
    return {
        id,
        authedUser,
        question,
        author,
        answered,
        answer,
        optionOneVotes,
        optionTwoVotes,
        optionOne,
        optionTwo

    
    }

}



export default connect(mapStateToProps)(PollPage);
