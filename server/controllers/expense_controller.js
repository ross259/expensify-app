const { mongoose } = require('../db/db');
const { Expense } = require('../models/expense');

module.exports = {

	getExpense(req, res, next) {
		const getExpense = Expense.findById(req.params.id)
		.then((result)=>{
			if (result) {
				// console.log('RESULT:', result);
				res.send(result);
			}else{
				res.sendStatus(404);
			} 
      }).catch(next);
	},

	getExpenses(req, res, next) {
		// console.log("HERHERHERHEHRHERHERHEHRHERHEH")
		const getExpenses = Expense.find({})
		.then((result)=>{
			if (result) {
				// console.log('RESULT:', result);
				res.send(result);
			}else{
				res.sendStatus(404);
			} 
      }).catch(next);
	},

	push(req, res, next) {

		const expense = new Expense(req.body);

		console.log('ID BEFORE SAVE:', expense._id)

		expense.save()
		.then((expense) => {
			res.send(expense);
		}).catch(next);
	},
	
	set(req, res, next) {

		const expenses = req.body;

		console.log('EXPENSES:', expenses);

		Expense.remove({})
		.then(()=>{
			return Expense.collection.insert(expenses)
		})
		.then((expenses) => {
			res.send(expenses);
		}).catch(next);
  }
  
}