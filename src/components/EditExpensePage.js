import React from 'react';
import { connect } from 'react-redux';

import ExpenseForm from './ExpenseForm';

import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {

  onSubmit = (expense)=>{
    this.props.startEditExpense(this.props.expense._id, expense);
    this.props.history.push('/');
  }

  onRemove = () => {
    this.props.startRemoveExpense(this.props.expense._id);
    this.props.history.push('/');
  }

  render(){
    return (
      <div>
      <h1>Edit Expense</h1>

      <ExpenseForm
        expense = {this.props.expense}
        onSubmit = {this.onSubmit}
      />

      <button
        onClick={this.onRemove}>Remove</button>
      </div>
    )
  }
};

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(expense => expense._id === props.match.params.id )
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense: (_id, expense) => dispatch(startEditExpense(_id, expense)),
  startRemoveExpense: (_id) => dispatch(startRemoveExpense(_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)