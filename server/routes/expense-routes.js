// const router = require ('express').Router()

const ExpenseController = require('../controllers/expense_controller');
const UserController = require('../controllers/user_controller');

module.exports = (app) => {

  // Authentication Routes

  // app.get('/api/auth/google', UserController.loginGoogle);

  // app.get('/api/auth/logout', UserController.logout);

  // Expense Routes

  app.get('/api/expenses', ExpenseController.getExpenses);
  
  app.get('/api/expenses/:id', ExpenseController.getExpense);

  app.post('/api/expenses/set', ExpenseController.set);
  
  app.post('/api/expenses', ExpenseController.push);

  app.patch('/api/expenses/:id', ExpenseController.update);

  app.delete('/api/expenses/:id', ExpenseController.delete);

}

// module.exports = router;