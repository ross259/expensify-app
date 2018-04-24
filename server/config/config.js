var env = process.env.NODE_ENV || 'development';

console.log('---------------------------');
console.log('ENVIRONMENT:', env);
console.log('---------------------------');

if (env === 'development'){
  process.env.DB_CONNECT = 'mongodb://localhost:27017/expensify';
}else if (env === 'test'){
  // process.env.DB_CONNECT = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds135963.mlab.com:35963/${process.env.DB_NAME}_test`;
}else if (env === 'production'){
  // process.env.DB_CONNECT = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds121171.mlab.com:21171/${process.env.DB_NAME}`;
}