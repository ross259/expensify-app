const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({

  description: {
    type: String,
    default: 'Description'
  },
  note: {
    type: String
  },
  createdAt: {
    type: Number,
  },
  amount: {
    type: Number
  }
})

const Expense = mongoose.model('ex_expense', ExpenseSchema)

module.exports = { Expense };