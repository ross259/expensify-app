var env = process.env.NODE_ENV || 'development';

console.log('---------------------------');
console.log('ENVIRONMENT:', env);
console.log('---------------------------');

if (env === 'development'){
  process.env.DB_URI = process.env.DB_URI_DEV;
}else if (env === 'test'){
  process.env.DB_URI = process.env.DB_URI_TEST;
  // process.env.DB_URI = 'mongodb://test_user:trains1234!@ds161304.mlab.com:61304/expensify_test';
}else if (env === 'production'){
  process.env.DB_URI = process.env.DB_URI;
}