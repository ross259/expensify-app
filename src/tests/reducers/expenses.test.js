import expensesReducer from '../../reducers/expenses';
import { ADD_EXPENSE, EDIT_EXPENSE, REMOVE_EXPENSE, SET_EXPENSES } from '../../actions/expenses';

import expenses from '../fixtures/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
})

test('should remove an expense by _id', () => {
  const action = { type: REMOVE_EXPENSE, _id: expenses[1]._id };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove an expense if _id not found', () => {
  const action = { type: REMOVE_EXPENSE, _id: '-1' };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
})

test('should add an expense', () => {
  const expense = { description: 'Rent', note: 'January', amount: 98000 };
  const action = { type: ADD_EXPENSE, expense };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
})

test('should edit an expense', () => {
  const note = 'My note'
  const action = { type: EDIT_EXPENSE, _id: expenses[1]._id, updates: { note } };
  const state = expensesReducer(expenses, action);
  expect(state[1].note).toBe(note);
})

test('should not edit expense if expense not found', () => {
  const action = { type: EDIT_EXPENSE, _id: '-1', updates: { note: 'Trains are fun' } };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
})

test('should set expenses', () => {
  const expenses = [
    {
      _id:'1',
      description:'Bananas',
      note:'',
      amount: 295,
      createdAt: 0
    },
    {
      _id:'2',
      description:'Pop',
      note:'',
      amount: 100,
      createdAt: 4
    }
  ]
  const action = { type: SET_EXPENSES, expenses }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
})