import { RECEIVED_USERS } from '../actions/users'
import { ADDED_QUESTION, ADDED_ANSWER } from '../actions/questions';
export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVED_USERS :
      return {
        ...state,
        ...action.users
      }
    case ADDED_QUESTION:
        return {
            ...state,
            [action.questions.author]: {
                ...state[action.questions.author],
                questions: state[action.questions.author].questions.concat([
                    action.questions.id
                ])
            }
        };

    case ADDED_ANSWER:
        const { qid, answer, authedUser } = action;

        return {
            ...state,
            [authedUser]: {
                ...state[authedUser],
                answer: {
                    ...state[authedUser].answer,
                    [qid]: answer
                }
            }
        };

    default:
        return state;
}
}  
  