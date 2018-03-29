import moment from 'moment';
import {addExpense, ADD_EXPENSE, editExpense, EDIT_EXPENSE, removeExpense, REMOVE_EXPENSE } from '../../actions/expenses';

test('should setup remove expense action object', ()=>{
  const action = removeExpense('43553');
  expect (action).toEqual({
    type: REMOVE_EXPENSE,
    id: '43553'
  })
})

test('should setup edit expense action object', ()=>{
  const action = editExpense('435436', {note:'new note value'})
  expect (action).toEqual({
    type: EDIT_EXPENSE,
    id:'435436',
    updates:{note:'new note value'}
  })
})

test('should setup add expense action object with provided values', () =>{
  const expenseData = {
    description:'Rent',
    amount:90000,
    note:'January',
    createdAt:moment()
  }
  const action = addExpense(expenseData);
  expect (action).toEqual({
    type:ADD_EXPENSE,
    expense:{
      ...expenseData,
      id:expect.any(String)
    }
  })
})

test('should setup add expense action object with default values', ()=>{
  const action = addExpense();
  expect (action).toEqual({
    type:ADD_EXPENSE,
    expense:{ 
      description:'', 
      note:'', 
      amount:0, 
      createdAt:0,
      id: expect.any(String)
    }
  })
})