import axios from 'axios';
import AppRouter, { history } from '../routers/AppRouter';

const API_URL = process.env.API_URL || '/api/';


// Get one expnese
const get = (node) => {
  console.log (`HERE::: ${API_URL}${node}`);
  return axios.get(`${API_URL}${node}`)
  .then((res)=>{
    // console.log()
    return res.data
  }).catch((e)=>{
    console.log('MONGO GET ERROR:');
  });
}

// Get all expenses
const getExpenses = (node) => {
  return axios.get(`${API_URL}${node}`)
  .then((res)=>{
    console.log("DATA::", res.data)
    return res.data
  }).catch((e)=>{
    console.log('MONGO GET ERROR:', e);
  });
}

const push = (node, data) =>{

  return axios.post(`${API_URL}${node}`, data)
  .then((res) => {
    return res
  }).catch((e)=>{
    console.log('MONGO PUSH ERROR:', e);
  })

}

const set = (node, data) => {

  return axios.post(`${API_URL}${node}/set`, data)
  .then((res) => {
    return res.data
  }).catch((e)=>{
    console.log('MONGO SET ERROR:', e);
  });

}

const updateExpense = (node, data) => {
  return axios.patch(`${API_URL}${node}`, data)
  .then((res) => {
    return res.data
  }).catch((e)=>{
    console.log('MONGO UPDATE ERROR:', e);
  });
}

const remove = (node) => {
  return axios.delete(`${API_URL}${node}`)
  .then((res) => {
    return res.data
  }).catch((e)=>{
    console.log('MONGO REMOVE ERROR:');
  })
}

// const whoAreYou = () => {
//   console.log('I am mongo');
// }

const signInWithGoogle = () => {
  console.log('Navigate To:', `${API_URL}auth/google`);
  window.location = `${API_URL}auth/google`;
}

const signOut = () => {
  console.log('logging out');
  return axios.get(`${API_URL}auth/logout`)
  .then((res)=>{
    console.log('Res:', res.data)
    history.push('/');
  }).catch((e)=>{
    console.log('MONGO LOGIN ERROR:');
  })
}

export { get, getExpenses, push, set, updateExpense, remove, signInWithGoogle, signOut }