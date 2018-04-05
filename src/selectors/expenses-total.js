export default (expenses) => {
  return expenses.reduce((acc, cur ) => acc + cur.amount, 0);
}