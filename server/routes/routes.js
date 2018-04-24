const ExpenseController = require('../controllers/expense_controller');

module.exports = (app) => {

  // app.get('/api/test/expense', ExpenseController.create);

  app.get('/api/expenses/:id', ExpenseController.get);
  
  app.post('/api/expenses', ExpenseController.push);

}