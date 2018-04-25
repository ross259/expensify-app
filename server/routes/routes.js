const ExpenseController = require('../controllers/expense_controller');

module.exports = (app) => {

  app.get('/api/expenses', ExpenseController.getExpenses);
  
  app.get('/api/expenses/:id', ExpenseController.getExpense);

  app.post('/api/expenses/set', ExpenseController.set);
  
  app.post('/api/expenses', ExpenseController.push);

}