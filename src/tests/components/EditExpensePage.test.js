import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';

import ExpenseForm from '../../components/ExpenseForm';

import expenses from '../fixtures/expenses';

let editExpense, removeExpense, history, wrapper;

beforeEach(()=>{
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow (
    <EditExpensePage
      editExpense={editExpense}
      removeExpense={removeExpense}
      history = {history}
      expense = {expenses[2]}
    />
  );
});

it ('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

it ('should handle EditExpensePage onSubmit', () => {
  wrapper.find(ExpenseForm).prop('onSubmit')(expenses[2]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
});

it ('should remove an expense', () => {
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(removeExpense).toHaveBeenLastCalledWith(expenses[2].id)
})