import selectExpensesTotal from '../../selectors/expenses-total';

import expenses from '../fixtures/expenses';

test('should return 0 if no expenses',()=>{
  const result = selectExpensesTotal([]);
  expect(result).toBe(0);
})

test('should correctly add up a single expnese', ()=>{
  const result = selectExpensesTotal([expenses[1]]);
  expect(result).toBe(expenses[1].amount);
})

test('should correctly add up muliple expneses',()=>{
  const expenseTotal = expenses.reduce((acc, cur)=>acc + cur.amount, 0);
  const result = selectExpensesTotal(expenses);
  expect(result).toBe(expenseTotal);
})