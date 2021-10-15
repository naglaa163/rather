
import {
   
    _saveQuestion,
    _saveQuestionAnswer,
    _getUsers,
    _getQuestions,
    
  } from './_DATA.js'
  
  export async function getInitialData () {
    const [users, questions] = await Promise.all([
      _getUsers(),
      _getQuestions(),
    ])
    return ({
      users,
      questions,
    })
  }
  
  export function saveQuestion (inform) {
    return _saveQuestion(inform)
  }
  
  export function saveQuestionAnswer (inform) {
    return _saveQuestionAnswer(inform)
  }
  