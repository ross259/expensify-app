// import 'react-dates/initialize';
import React from 'react';

import {connect} from 'react-redux';

import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

import { DateRangePicker } from 'react-dates';
import moment from 'moment';

export class ExpenseListFilters extends React.Component {

  state = {
    focusedInput:null
  }
  
  onDatesChange = ({startDate, endDate}) => {
    this.props.setStartDate(startDate)
    this.props.setEndDate(endDate)
  }

  onFocusChange = (focusedInput) => {
    // console.log(focusedInput)
    this.setState(()=>({focusedInput}))
  }

  onTextChange = (e)=>{
    this.props.setTextFilter(e.target.value)
  }

  onSortChange = (e)=>{
    e.target.value ==='date' ? this.props.sortByDate() : this.props.sortByAmount()
  }

  render(){
    return (
      <div>
      <input type="text" onChange={this.onTextChange} value={this.props.filters.text} />
      <select name="" id="" value={this.props.filters.sortBy} onChange={this.onSortChange}>
        <option value="date">Date</option>
        <option value="amount">Amount</option>
      </select>
      {this.props.filters.sortBy === 'date' &&
      <DateRangePicker
        startDate={this.props.filters.startDate} // momentPropTypes.momentObj or null,
        startDateId="start_date" // PropTypes.string.isRequired,
        endDate={this.props.filters.endDate} // momentPropTypes.momentObj or null,
        endDateId="end_date" // PropTypes.string.isRequired,
        // onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
        onDatesChange={this.onDatesChange}
        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        // onFocusChange={focusedInput => this.setState(()=>({ focusedInput }))} // PropTypes.func.isRequired,
        onFocusChange={this.onFocusChange}
        showClearDates={true}
        numberOfMonths={1}
        isOutsideRange={() => false}
      />}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filters:state.filters
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);