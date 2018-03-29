import React from 'react';
import { shallow } from 'enzyme';

import moment from 'moment';
import { DateRangePicker } from 'react-dates';

import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { defaultFilters, definedFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(()=>{
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters = {defaultFilters}
      setTextFilter = {setTextFilter}
      sortByDate = {sortByDate}
      sortByAmount = {sortByAmount}
      setStartDate = {setStartDate}
      setEndDate = {setEndDate}
    />
  );
});

it ('should render ExpenseListFilters', () => {
  expect(wrapper).toMatchSnapshot();
});

it ('should render ExpenseListFilters with defined filters', () => {
  wrapper.setProps({filters:definedFilters});
  expect(wrapper).toMatchSnapshot();
});

it ('should handle text change', ()=>{
  const value = 'rent';
  wrapper.find('input').simulate('change', {
    target:{value}
  });
  expect(setTextFilter).toHaveBeenCalledWith(value);
});

it ('should sort by date', ()=>{
  const value='date';
  wrapper.setProps({filters:definedFilters});
  wrapper.find('select').simulate('change', {
    target:{value}
  });
  expect(sortByDate).toHaveBeenCalled();
});

it ('should sort by amount', ()=>{
  const value='amount';
  wrapper.find('select').simulate('change', {
    target:{value}
  });
  expect(sortByAmount).toHaveBeenCalled();
});

it ('should handle date changes', ()=>{
  const startDate = moment(0);
  const endDate = moment(0).add(4, 'days');
  wrapper.find(DateRangePicker).prop('onDatesChange')({startDate, endDate});
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

it ('should handle date focus changes', () => {
  const focusedInput = 'endDate'
  wrapper.find(DateRangePicker).prop('onFocusChange')(focusedInput);
  expect(wrapper.state('focusedInput')).toBe(focusedInput);
});