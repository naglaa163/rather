import {RECEIVED_ADD_QUESTIONS, ADDED_QUESTION, ADDED_ANSWER} from '../actions/questions';

export default function questions(state = {}, action) {
  if (action.type === RECEIVED_ADD_QUESTIONS) {
    return {
      ...state,
      ...action.questions
    };
  }

  if (action.type === ADDED_QUESTION) {
    const {question} = action;

    return {
      ...state,
      [question.id]: question
    };
  }

  if (action.type === ADDED_ANSWER) {
    const {authedUser, qid, answer} = action;

    const questions = {
      ...state,
      [qid]: {
        ...state[qid],
        [answer]: {
          ...state[qid][answer],
          votes: [...state[qid][answer].votes, authedUser]
        }
      }
    };

    return {
      ...state,
      ...questions
    };
  }

  return state;
}