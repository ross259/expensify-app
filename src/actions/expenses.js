import uuid from 'uuid';
// import moment from 'moment'
import db from '../db/db_config';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const SET_EXPENSES = 'SET_EXPENSES';
export const START_SET_EXPENSES = 'START_SET_EXPENSES';

// Move to firebaseAPI
// import database from '../firebase/firebase';

// import * as db_mongo from '../db/db_mongo';
// import * as db_firebase from '../db/db_firebase';

// const db = db_mongo;

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

export const editExpense = (id, updates) => (
  {
    type: EDIT_EXPENSE,
    id,
    updates
  }
)

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