import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import numeral from 'numeral';

import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
  <div>
  { !props.expenses || props.expenses.length === 0 ? (
    <p>No expenses found.</p>
  ):(
    props.expenses.map((expense)=>(<ExpenseListItem key={ expense._id} {...expense} />))
  )}
  </div>
)

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  }
}

export default connect(mapStateToProps)(ExpenseList);