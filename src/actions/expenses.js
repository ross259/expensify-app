import uuid from 'uuid';
// import moment from 'moment'
import db from '../db/db_config';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

// Move to firebaseAPI
// import database from '../firebase/firebase';

// import * as db_mongo from '../db/db_mongo';
// import * as db_firebase from '../db/db_firebase';

// const db = db_mongo;

export const addExpense = ( expense ) => ({
  type: ADD_EXPENSE,
  expense
});

  // *** To return a function requires store to be configured with redux-thunk
export const startAddExpense = (expenseData={}) => {
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

    // MOVE TO FIREBASE / MONGO API
    // database.ref('expenses').push(expense).then((ref)=>{
    //   dispatch(addExpense({
    //     id:ref.key,
    //     ...expense
    //   }))
    // });

    return db.push('expenses', expense)
    .then((ref)=>{
        const id = ref.data ? ref.data._id : ref.key;
        console.log('-------------------------- IDs!', id);
        dispatch(addExpense({
          id: id,
          // _id: id,
          ...expense
        }))
      }).catch((e)=>{
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

