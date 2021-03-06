import React from 'react';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';


// const now = moment();
// console.log (now.format('MMM Do, YYYY'))

export default class ExpenseForm extends React.Component {

  constructor (props){
    super(props)

   // const { description, note, amount, createdAt } = props.expense

    this.state = {
      // _id: props.expense ? props.expense._id : '',
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note :'',
      amount: props.expense ? (props.expense.amount/100).toString() :'',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: ''
    }
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({description}));
  }

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(()=>({note}));
  }
  
  onAmountChange = (e) => {
    const amount = e.target.value;
    if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(()=>({amount}))
    }
  }

  onDateChange = (createdAt) => {
    createdAt && this.setState(() => ({createdAt}));
  }

  onFocusChange = ({ focused }) => {
   this.setState(()=>({ calendarFocused:focused }))
  }

  onSubmit = (e) => {
    e.preventDefault();
    if(!this.state.description || !this.state.amount){
      this.setState(()=>({error:'Description and amount must be entered.'}))
    }else {
      this.setState(()=>({error:''}))
      this.props.onSubmit({
        // _id: this.state._id,
        description:this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        note: this.state.note,
        createdAt:this.state.createdAt.valueOf()
      })
    }
  }

  render() {
    return (
      <div>
        { this.state.error && <div>{this.state.error}</div>}
        <form onSubmit={this.onSubmit}>
        <input type="text" placeholder="Description" autoFocus value={this.state.description} onChange={this.onDescriptionChange}/>
        <input type="text" placeholder="Amount" value={this.state.amount} onChange={this.onAmountChange} />
        <SingleDatePicker
          date={this.state.createdAt} // momentPropTypes.momentObj or null
          onDateChange={this.onDateChange} // PropTypes.func.isRequired
          focused={this.state.calendarFocused} // PropTypes.bool
          onFocusChange={this.onFocusChange} // PropTypes.func.isRequired
          numberOfMonths={1}
          isOutsideRange={() => false }
        />
        <textarea placeholder="Add a note for your expense (optional)" value={this.state.note} onChange={this.onNoteChange}></textarea>
        <button>{this.props.expense ? 'Edit Expense' : 'Add Expense'}</button>
        </form>
      </div>
    )
  }
}
