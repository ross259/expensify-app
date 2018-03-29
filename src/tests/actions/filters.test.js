import {
  setTextFilter,
   sortByDate,
   sortByAmount,
   setStartDate,
   setEndDate,
   SET_TEXT_FILTER,
   SORT_BY_DATE,
   SORT_BY_AMOUNT,
   SET_START_DATE,
   SET_END_DATE
} from '../../actions/filters';

import moment from 'moment';

test ('should set the text filter with parameters', ()=>{
  const text = 'Text to filter';
  const action = setTextFilter(text);
  expect (action).toEqual({
    type:SET_TEXT_FILTER,
    text
  });
});

test ('should set the text filter with defaults',()=>{
  const action = setTextFilter('');
  expect (action).toEqual({
    type:SET_TEXT_FILTER,
    text:''
  });
});

test ('should generate action object for sort by date', ()=>{
  const action = sortByDate();
  expect (action).toEqual({
    type:SORT_BY_DATE,
  });
});

test ('should generate action object for sort by amount',()=>{
  const action = sortByAmount();
  expect (action).toEqual({
    type:SORT_BY_AMOUNT,
  });
});

test('should generate setStartDate action object', ()=>{

  const startDate = moment();
  const action = setStartDate(startDate);

  expect (action).toEqual({
    type:SET_START_DATE,
    startDate
  });

});

test('should generate setEndDate action object', ()=>{

  const endDate = moment();
  const action = setEndDate(endDate);

  expect (action).toEqual({
    type:SET_END_DATE,
    endDate
  });
});