import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const ADD_EXPENSE = 'ADD_EXPENSE';
const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
const EDIT_EXPENSE = 'EDIT_EXPENSE';

const SET_TEXT_FILTER = 'SET_TEXT_FILTER';
const SORT_BY_DATE = 'SORT_BY_DATE';
const SORT_BY_AMOUNT = 'SORT_BY_AMOUNT';
const SET_START_DATE = 'SET_START_DATE';
const SET_END_DATE = 'SET_END_DATE';

const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => (
  {
    type: ADD_EXPENSE,
    expense: {
      id: uuid(),
      description,
      note,
      amount,
      createdAt
    }
  });

const removeExpense = (id) => (
  {
    type: REMOVE_EXPENSE,
    id
  }
)

const editExpense = (id, updates) => (
  {
    type: EDIT_EXPENSE,
    id,
    updates
  }
)

const setTextFilter = (text = '') => (
  {
    type: SET_TEXT_FILTER,
    text
  }
)

const sortByDate = () => (
  {
    type: SORT_BY_DATE
  }
)

const sortByAmount = () => (
  {
    type: SORT_BY_AMOUNT
  }
)

const setStartDate = (startDate) => (
  {
    type: SET_START_DATE,
    startDate
  }
)

const setEndDate = (endDate) => (
  {
    type: SET_END_DATE,
    endDate
  }
)

const defaultExpensesState = [];

const defaultFiltersState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}

const expenseReducer = (state = defaultExpensesState, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      return [
        ...state,
        action.expense
      ];
    case REMOVE_EXPENSE:
      return state.filter(e => e.id !== action.id)
    case EDIT_EXPENSE:
      return state.map((expense) => expense.id === action.id ? { ...expense, ...action.updates } : expense)
    default:
      return state
  }
}

const filterReducer = (state = defaultFiltersState, action) => {
  switch (action.type) {
    case SET_TEXT_FILTER:
      return {
        ...state,
        text: action.text
      }
    case SORT_BY_DATE:
      return {
        ...state,
        sortBy: 'date'
      }
    case SORT_BY_AMOUNT:
      return {
        ...state,
        sortBy: 'amount'
      }
    case SET_START_DATE:
      return {
        ...state,
        startDate: action.startDate
      }
    case SET_END_DATE:
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state
  }
}

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter ((expense) => {

    text = text.toLowerCase();

    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDateMatch !== 'number' || expense.createdAt <= endDate;
    const textMatch = typeof text !== 'string' || expense.description.toLowerCase().includes(text) || expense.note.toLowerCase().includes(text);

    return startDateMatch && endDateMatch && textMatch
  }).sort ((a, b)=>{
    if(sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'amount'){
      return a.amount < b.amount ? 1 : -1;
    }
  })
}

// const reducers = combineReducers({
//   expenses:expenseReducer,
//   filters: filterReducer
// })

const store = createStore(
  combineReducers({
    expenses: expenseReducer,
    filters: filterReducer
  })
);


store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
  console.log(visibleExpenses);
  // console.log(state)
})

store.dispatch(sortByDate());
store.dispatch(sortByAmount());

const e1 = store.dispatch(addExpense({ description: 'Jan Rent coffee', amount: 900000, createdAt: 21000}));
const e2 = store.dispatch(addExpense({ description: 'Nice Computer stuff', amount: 2000000, createdAt: -1000 }));
const e3 = store.dispatch(addExpense({ description: 'Big Coffee for John', note:'At the computer store', amount: 200 }));

store.dispatch(setTextFilter())

// store.dispatch(removeExpense(e3.expense.id))
// store.dispatch(editExpense(e2.expense.id, { description: 'Car', amount: 4000000 }));

// store.dispatch(setTextFilter('Car'));
// store.dispatch(setTextFilter('Rent'));

// store.dispatch(setStartDate(125));
// store.dispatch(setEndDate(135));

// store.dispatch(setStartDate());
// store.dispatch(setEndDate());


const demoState = {
  expenses: [{
    id: 'asdfdasfj',
    description: 'Jan Rent',
    note: 'Final payment',
    amount: 45000,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
}

const user = {
  name: 'Ross',
  age: 32
}

const updateUser = {
  age: 42,
  favoriteFood: "Bananas"
}

const newUser = { name: 'Paul', ...user, location: 'calgary', ...updateUser }

const newUser2 = Object.assign({}, user, updateUser, { location: 'Florida' });

console.log(newUser);

console.log(newUser2);

console.log(user)

console.log(updateUser);