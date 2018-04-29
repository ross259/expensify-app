import db from '../db/db_config';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const SET_EXPENSES = 'SET_EXPENSES';
export const START_SET_EXPENSES = 'START_SET_EXPENSES';

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense
});

// *** To return a function requires store to be configured with redux-thunk
export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {

    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;

    const expense = {
      description,
      note,
      amount,
      createdAt
    }
    return db.push('expenses', expense)
      .then((ref) => {
        const _id = ref.data ? ref.data._id : ref.key;
        dispatch(addExpense({
          _id: _id,
          ...expense
        }))
      }).catch((e) => {
        console.log('ERROR', e);
      });
  }
}

export const removeExpense = (_id) => (
  {
    type: REMOVE_EXPENSE,
    _id
  }
)

export const startRemoveExpense = (_id) => {
  return (dispatch) => {
    return db.remove(`expenses/${_id}`)
    .then(() =>{
      dispatch(removeExpense(_id))
    }).catch((e)=>{
      console.log('Remove Expense Error:', e);
    })
  }
}

export const editExpense = (_id, updates) => (
  {
    type: EDIT_EXPENSE,
    _id,
    updates
  }
)

export const startEditExpense = (_id, updates) => {

}

export const setExpenses = (expenses) => (
  {
    type: SET_EXPENSES,
    expenses
  }
)

export const startSetExpenses = (expenses) => {
  return (dispatch) => {

    return db.getExpenses('expenses')
      .then((expenses) => {
        dispatch(setExpenses(expenses))
      }).catch((e) => {
        console.log('ERROR', e);
      });

  };
};