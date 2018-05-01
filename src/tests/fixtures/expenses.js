import moment from 'moment';
// import mongoose from 'mongoose'

export default [
  {
    _id:'5ae650a1974b71284859885e',
    description:'Gum',
    note:'',
    amount: 195,
    createdAt: 0
  },
  {
    _id:'5ae650a1974b71284859885f',
    description:'Rent',
    note:'',
    amount: 12500,
    createdAt: moment(0).subtract(4, 'days').valueOf()
  },
  {
    _id:'5ae650a1974b712848598860',
    description:'Credit Card',
    note:'',
    amount: 4500,
    createdAt: moment(0).add(4, 'days').valueOf()
  }
]