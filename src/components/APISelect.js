import React from 'react';
import { setAPI } from '../actions/api';

// import { setAPI } from '../db/db_config';
import db from '../db/db_config';

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
  setAPI: (APIType) => dispatch(setAPI(APIType))
})

export default connect(mapStateToProps, mapDispatchToProps)(APISelect);