import React from 'react';
import { Link } from 'react-router-dom';

// These are only used for 'Remove' button. 'connect' is not necessary if you don't want the remove button.
// If 'Remove' button is removed 'dispatch' is no longer needed to be destructured either.

// import { connect } from 'react-redux';
// import {removeExpense} from '../actions/expenses';

export const ExpenseListItem = ({description, amount, createdAt, id, dispatch}) => (
  
    <div>
      <Link to={`/edit/${id}`}>
      <h3>
        {description}
      </h3>
      </Link>
      <p>{amount} - {createdAt}</p>

      { /*true ||
        <button onClick={(e) => {
          dispatch(removeExpense(id))
        }}>Remove</button>
      */}

    </div>
  
)

// export default connect ()(ExpenseListItem);
export default ExpenseListItem