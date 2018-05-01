import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

// These are only used for 'Remove' button. 'connect' is not necessary if you don't want the remove button.
// If 'Remove' button is removed 'dispatch' is no longer needed to be destructured either.

// import { connect } from 'react-redux';
// import {removeExpense} from '../actions/expenses';

export const ExpenseListItem = ({ description, amount, createdAt, _id, dispatch }) => (

  <div>
    <Link to={`/edit/${_id}`}>
      <h3>
        {description}
      </h3>
    </Link>
    <p>
    {numeral(amount / 100).format('$0,0.00')}
     - 
    {moment(createdAt).format('MMMM Do, YYYY')}
    </p>

    {
      /*true ||
      <button onClick={(e) => {
        dispatch(removeExpense(id))
      }}>Remove</button>
    */
    }

  </div>

)

// export default connect ()(ExpenseListItem);
export default ExpenseListItem