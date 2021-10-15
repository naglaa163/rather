import { getInitialData } from '../utils/api'
import { receivedUsers } from './users'
import {receivedAddQuestions} from './questions'
import { showLoading, hideLoading } from 'react-redux-loading'



export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receivedUsers(users))
        dispatch(receivedAddQuestions(questions))
       
        dispatch(hideLoading())
      })
  }
}