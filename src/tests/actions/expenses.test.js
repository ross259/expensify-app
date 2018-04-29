import moment from 'moment';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startAddExpense, addExpense, ADD_EXPENSE, editExpense, EDIT_EXPENSE, removeExpense, REMOVE_EXPENSE, setExpenses, SET_EXPENSES, startSetExpenses, START_SET_EXPENSES, startRemoveExpense, START_REMOVE_EXPENSE } from '../../actions/expenses';
import db from '../../db/db_config';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  db.set('expenses', expenses).then(() => done());
});

test('should setup remove expense action object', () => {
  const action = removeExpense('43553');
  expect(action).toEqual({
    type: REMOVE_EXPENSE,
    _id: '43553'
  });
});

test('should remove expense from db', (done)=> {
  const store = createMockStore({});
  const _id = expenses[2]._id
  store.dispatch(startRemoveExpense(_id)).then(()=>{
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: REMOVE_EXPENSE,
      _id
    });
    return db.get(`expenses/${_id}`);
  }).then((snapshot)=>{
    expect(snapshot).toBeFalsy();
    done();
  })
})

test('should setup edit expense action object', () => {
  const action = editExpense('435436', { note: 'new note value' })
  expect(action).toEqual({
    type: EDIT_EXPENSE,
    _id: '435436',
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
          _id: expect.any(String),
          // _id: expect.any(String),
          ...expenseData
        }
      });
      return db.get(`expenses/${actions[0].expense._id}`);
    }).then((snapshot) => {
      expect({
        description: snapshot.description,
        note: snapshot.note,
        amount: snapshot.amount,
        createdAt: snapshot.createdAt
      }).toEqual(expenseData);
      done();
    });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({})
  const expenseDefaults = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  }
  store.dispatch(startAddExpense())
    .then(() => {
      const actions = store.getActions();
      // console.log('ACTIONS:', actions)
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          _id: expect.any(String),
          // _id: expect.any(String),
          ...expenseDefaults
        }
      });
      return db.get(`expenses/${actions[0].expense._id}`);
    }).then((snapshot) => {
      expect({
        description: snapshot.description,
        note: snapshot.note,
        amount: snapshot.amount,
        createdAt: snapshot.createdAt
      }).toEqual(expenseDefaults);
      done();
    });
});

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: SET_EXPENSES,
    expenses
  });
});

test('should fetch expenses from db', (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: SET_EXPENSES,
      expenses
    });
    done();
  });
});