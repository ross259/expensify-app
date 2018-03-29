import { ADD_EXPENSE, REMOVE_EXPENSE, EDIT_EXPENSE } from '../actions/expenses'

const defaultState = [];

const expenseReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      return [
        ...state,
        action.expense
      ];
    case REMOVE_EXPENSE:
      return state.filter(e => e.id !== action.id)
    case EDIT_EXPENSE:
      return state.map((expense) => expense.id === action.id ? { ...expense, ...action.updates } : expense)
    default:
      return state
  }
}

export default expenseReducer;