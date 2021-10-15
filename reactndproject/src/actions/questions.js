import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { showLoading,  } from 'react-redux-loading-bar';

export const RECEIVED_ADD_QUESTIONS = 'RECEIVED_ADD_QUESTIONS';
export const ADDED_QUESTION = 'ADDED_QUESTION';
export const ADDED_ANSWER = 'ADDED_ANSWER';

export function receivedAddQuestions(questions) {
	return {
		type: RECEIVED_ADD_QUESTIONS,
		questions
	};
}

function addedQuestion({ id, timestamp, author, optionOne, optionTwo }) {
    return {
        type: ADDED_QUESTION,
        id,
        timestamp,
        author,
        optionOne,
        optionTwo
    }
}


function addedAnswer({ qid, answer, authedUser }) {
	return {
		type: ADDED_ANSWER,
			qid,
			answer,
			authedUser
		}
	};



export function receiveAddQuestion(optionOneText, optionTwoText) {
	return  (dispatch, getState) => {
		const { authedUser } = getState();

		dispatch(showLoading());

		const questionInform ={
			optionOneText,
			optionTwoText,
			author: authedUser
		};
		return saveQuestion(questionInform)
		.then((question) => {
			console.log('CREATED QUESTION', question);
			dispatch(addedQuestion(question))
		})
		.catch( (error) => {
			console.log('There was a proplem.')
	});
}
}

export function resievedAddReply(inform) {
	return (dispatch) => {
        
        dispatch(addedAnswer(inform))
        return saveQuestionAnswer(inform)
            .then(() => console.log(' answer'))
            .catch( (error) => {
                console.log('There was a problem saving question.');
            })
    }
}