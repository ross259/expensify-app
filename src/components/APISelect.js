import React from 'react';
import { setAPI } from '../actions/api';

import { startSetExpenses } from '../actions/expenses';
import db from '../db/db_config';
// import { setAPIType } from '../db/db_config';

import { connect } from 'react-redux';

export class APISelect extends React.Component {

  // state = {
  //   APIType: '3'
  // }

  onAPIChange = (e) => {
    // const num = e.target.value;
    // this.state.APIType = num;
    // setAPI(num);
    // db.whoAreYou();
    // e.target.value ==='date' ? this.props.sortByDate() : this.props.sortByAmount()
    this.props.setAPI(e.target.value);
    this.props.startSetExpenses();
    db.whoAreYou();
  }

  render() {
    return (
      <div>
        <select name="" id="" value={this.props.api.APIType} onChange={this.onAPIChange}>
          <option value="mongo">Mongo</option>
          <option value="firebase">Firebase</option>
          <option value="mysql">MySQL</option>
        </select>
        <h6>* Remember to enable CORS when testing on Chrome.</h6>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    api: state.api
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  setAPI: (APIType) => dispatch(setAPI(APIType)),
  startSetExpenses: () =>dispatch(startSetExpenses())
})

export default connect(mapStateToProps, mapDispatchToProps)(APISelect);