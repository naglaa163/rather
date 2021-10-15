class QuestionPage extends Component {
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
    choosedReply(answer) {
        this.setState((previousState) => {
            return {chosedReply: answer}
        })
    }
    render() {
        const { question, author, answered, answer, votesOptionOne, votesOptionTwo, totalVotes, percentageOptionOne, percentageOptionTwo } = this.props;
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
                                <div className="option-one">{question.optionOne.text}</div>

                                <div className="cont">
                                    <div>{votesOptionOne} out of {totalVotes} votes</div>
                                    <div>Percentage votes: {percentageOptionOne}%</div>
                                </div>
                                <div className="votes">Your pick</div>
                            </div>

                            <div className={answer === 'optionTwo' ? 'contents chosed': 'contents'}>
                                <div className="option-two">{question.optionTwo.text}</div>

                                <div className="cont">
                                    <div>{votesOptionTwo} out of {totalVotes} votes</div>
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
    const answered = question ? (question.optionOne.votes.indexOf(authedUser) > -1 || question.optionTwo.votes.indexOf(authedUser) > -1) : false
    const votesOptionOne = (question && question.optionOne.votes) ? question.optionOne.votes.length : 0
    const votesOptionTwo = (question && question.optionTwo.votes) ? question.optionTwo.votes.length : 0
    const totalVotes = votesOptionOne + votesOptionTwo
    const percentageOptionOne = ((votesOptionOne / totalVotes) * 100).toFixed(1)
    const percentageOptionTwo = ((votesOptionTwo / totalVotes) * 100).toFixed(1)


    const answer = users[authedUser].answers[id]
  
    return {
        id,
        authedUser,
        question,
        author,
        answered,
        answer,
        votesOptionOne,
        votesOptionTwo,
        totalVotes,
        percentageOptionOne,
        percentageOptionTwo
    }
}

export default connect(mapStateToProps)(QuestionPage);
