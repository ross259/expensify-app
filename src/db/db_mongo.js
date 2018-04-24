import axios from 'axios';

const API_URL = 'http://localhost:3000/api/';

const get = (node) => {
  // console.log (`HERE::: ${API_URL}${node}`);
  return axios.get(`${API_URL}${node}`)
  .then((res)=>{
    console.log('RES:', res.data)
    return res.data
  }).catch((e)=>{
    console.log('GET ERROR:', e);
  });
}

const push = (node, data) =>{

  // console.log('Pushing expense:', data)

  return axios.post(`${API_URL}${node}`, data)
  .then((res) => {
   // console.log('SUCCESS!', res);
    return res
  }).catch((e)=>{
    console.log('PUSH ERROR:', e);
  })

}

export { push, get }