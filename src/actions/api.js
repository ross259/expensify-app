// import db from '../db/db_config';
import { setAPIType } from '../db/db_config';

export const SET_API = 'SET_API';

export const setAPI = (APIType = 'mongo') => {
  console.log('API TYPE:', APIType);
  setAPIType(APIType);
  return {
    type: SET_API,
    APIType
  }
}

// export const setAPI = (APIType = 'firebase') => (
//   {
//     type: SET_API,
//         APIType
//   }
// )