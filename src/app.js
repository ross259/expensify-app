import 'react-dates/initialize';

import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter, { history } from './routers/AppRouter';

import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import { startSetExpenses } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

import db from './db/db_config';

const store = configureStore();

import { firebase } from './firebase/firebase';

// store.subscribe(() => {
//   const state = store.getState();
//   const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
//   console.log(visibleExpenses);
//   // console.log(state)
// })

// store.dispatch(addExpense({description:'Water Bill', amount:4500, createdAt:1000}));
// store.dispatch(addExpense({description: 'Gas Bill', amount:3400, createdAt:1005}));
// store.dispatch(addExpense({description: 'Rent', amount:109500, createdAt:995}));

// store.dispatch(setTextFilter('bill'));
// store.dispatch(setTextFilter('water'));

// setTimeout(() => {
//   store.dispatch(setTextFilter('bill'));
// }, 3000)

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered){
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

// store.dispatch(startSetExpenses()).then(() => {
//   ReactDOM.render(jsx, document.getElementById('app'));
// });


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('logged in. UID', user.uid);
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
    });
  } else {
    console.log('logged out');
    renderApp();
    // history.push('/');
  }
});