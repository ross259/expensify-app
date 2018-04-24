import moment from 'moment';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startAddExpense, addExpense, ADD_EXPENSE, editExpense, EDIT_EXPENSE, removeExpense, REMOVE_EXPENSE } from '../../actions/expenses';
import db from '../../db/db_config';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]);

test('should setup remove expense action object', () => {
  const action = removeExpense('43553');
  expect(action).toEqual({
    type: REMOVE_EXPENSE,
    id: '43553'
  });
});

test('should setup edit expense action object', () => {
  const action = editExpense('435436', { note: 'new note value' })
  expect(action).toEqual({
    type: EDIT_EXPENSE,
    id: '435436',
    updates: { note: 'new note value' }
  });
});

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[1]);
  expect(action).toEqual({
    type: ADD_EXPENSE,
    expense: expenses[1]
  });
});

test('should add expense to database and store', (done) => {
  const store = createMockStore({})
  const expenseData = {
    description: 'Mouse',
    note: 'Good MOOSE',
    amount: 3000,
    createdAt: 1000
  }
  store.dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      // console.log('ACTIONS:', actions)
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          // _id: expect.any(String),
          ...expenseData
        }
      });
      return db.get(`expenses/${actions[0].expense.id}`);
    }).then((snapshot) => {
      expect({
        description:snapshot.description,
        note:snapshot.note,
        amount: snapshot.amount,
        createdAt:snapshot.createdAt
      }).toEqual(expenseData);
      done();
    });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({})
  const expenseDefaults = {
    description : '',
    note : '',
    amount : 0,
    createdAt : 0
  }
  store.dispatch(startAddExpense())
    .then(() => {
      const actions = store.getActions();
      // console.log('ACTIONS:', actions)
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          // _id: expect.any(String),
          ...expenseDefaults
        }
      });
      return db.get(`expenses/${actions[0].expense.id}`);
    }).then((snapshot) => {
      expect({
        description:snapshot.description,
        note:snapshot.note,
        amount: snapshot.amount,
        createdAt:snapshot.createdAt
      }).toEqual(expenseDefaults);
      done();
    });
});

// test('should setup add expense action object with default values', ()=>{
//   const action = addExpense();
//   expect (action).toEqual({
//     type:ADD_EXPENSE,
//     expense:{ 
//       description:'', 
//       note:'', 
//       amount:0, 
//       createdAt:0,
//       id: expect.any(String)
//     }
//   })
// })