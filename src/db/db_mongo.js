import axios from 'axios';

const API_URL = process.env.API_URL || '/api/';


// Get one expnese
const get = (node) => {
  // console.log (`HERE::: ${API_URL}${node}`);
  return axios.get(`${API_URL}${node}`)
  .then((res)=>{
    return res.data
  }).catch((e)=>{
    console.log('GET ERROR:', e);
  });
}

// Get all expenses
const getExpenses = (node) => {
  return axios.get(`${API_URL}${node}`)
  .then((res)=>{
    console.log("DATA::", res.data)
    return res.data
  }).catch((e)=>{
    console.log('GET ERROR:', e);
  });
}

const push = (node, data) =>{

  return axios.post(`${API_URL}${node}`, data)
  .then((res) => {
    return res
  }).catch((e)=>{
    console.log('PUSH ERROR:', e);
  })

}

const set = (node, data) => {

  return axios.post(`${API_URL}${node}/set`, data)
  .then((res) => {
    return res.data
  }).catch((e)=>{
    console.log('SET ERROR:', e);
  });

}

const remove = (node) => {
  return axios.delete(`${API_URL}${node}`)
  .then((res) => {
    return res.data
  }).catch((e)=>{
    console.log('REMOVE ERROR:');
  })
}

export { get, getExpenses, push, set, remove }