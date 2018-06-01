import * as db_mongo from './db_mongo';
import * as db_firebase from './db_firebase';

// FOR LOCAL DEV db_mongo REQUIRES CORS ENABLED
// let db = db_mongo;
// let db = db_mongo;
let db;

const setAPIType = (apiType) => {
  console.log('Setting API', apiType)
  if (apiType === 'mongo') {
    db = db_mongo;
  } else if (apiType === 'firebase') {
    db = db_firebase;
  }else{
    console.log(`Type ${apiType} is not supported.`)
  }
}

setAPIType('mongo')
// setAPIType('firebase')

export {
  setAPIType,
  db as default
}