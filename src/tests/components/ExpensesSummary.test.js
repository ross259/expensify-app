import React from 'react';
import {shallow} from 'enzyme';

import expenses from '../fixtures/expenses';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test ('should render ExpensesSummary correctly with no expenses', ()=>{
  const wrapper = shallow(<ExpensesSummary />);
  expect(wrapper).toMatchSnapshot();
});

test ('should render ExpensesSummary with one expense', ()=>{
  const wrapper = shallow(<ExpensesSummary expenseCount={1} expenseTotal={34234234} />);
  expect(wrapper).toMatchSnapshot();
});

test ('should render ExpensesSummary with multiple expenses', ()=>{
  const wrapper = shallow(<ExpensesSummary expenseCount={23} expenseTotal={23423423} />);
  expect(wrapper).toMatchSnapshot();
});