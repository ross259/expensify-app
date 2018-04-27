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
        const id = ref.data ? ref.data._id : ref.key;
        dispatch(addExpense({
          id: id,
          // _id: id,
          ...expense
        }))
      }).catch((e) => {
        console.log('ERROR', e);
      });
  }
}

export const removeExpense = (id) => (
  {
    type: REMOVE_EXPENSE,
    id
  }
)

export const startRemoveExpense = (id) => {
  return (dispatch) => {
    return db.remove(`expenses/${id}`)
    .then(() =>{
      dispatch(removeExpense(id))
    }).catch((e)=>{
      console.log('Remove Expense Error:', e);
    })
  }
}

export const editExpense = (id, updates) => (
  {
    type: EDIT_EXPENSE,
    id,
    updates
  }
)

export const startEditExpense = (id, updates) => {

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