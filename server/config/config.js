var env = process.env.NODE_ENV || 'development';

console.log('---------------------------');
console.log('ENVIRONMENT:', env);
console.log('---------------------------');

if (env === 'development'){
  process.env.DB_CONNECT = 'mongodb://localhost:27017/expensify';
}else if (env === 'test'){
  // process.env.DB_CONNECT = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds135963.mlab.com:35963/${process.env.DB_NAME}_test`;
  process.env.DB_CONNECT = 'mongodb://test_user:trains1234!@ds161304.mlab.com:61304/expensify_test';
}else if (env === 'production'){
  // process.env.DB_CONNECT =`mongodb://ross259:w0Rd2urM0M!@ds157599.mlab.com:57599/expensify`;
  // SERVER ENVIRONMENT VARIABLE
}