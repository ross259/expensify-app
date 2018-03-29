import React from 'react';
import { shallow } from 'enzyme';

import expenses from '../fixtures/expenses';
import { ExpenseList } from '../../components/ExpenseList';

it ('should render ExpenseList with expenses', () => {
  const wrapper = shallow (<ExpenseList expenses={expenses} />);
  expect(wrapper).toMatchSnapshot();
})

it ('should render ExpenseList with No Expenses Found if no expenses are found', ()=>{
  const wrapper = shallow(<ExpenseList expenses={[]}/>);
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('p').text()).toBe('No expenses found.');
})