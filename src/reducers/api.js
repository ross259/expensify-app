import { SET_API } from '../actions/api';

const defaultState = {
  APIType:'mongo'
}

const apiReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_API:
      return {
        ...state,
        APIType: action.APIType
      }
    default:
      return state
  }
}

export default apiReducer;