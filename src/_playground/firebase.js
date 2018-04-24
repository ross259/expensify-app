import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyD0Z9U-4QNqkhmVxEBUN4A_wHukmecWEwk",
  authDomain: "expensify-76127.firebaseapp.com",
  databaseURL: "https://expensify-76127.firebaseio.com",
  projectId: "expensify-76127",
  storageBucket: "expensify-76127.appspot.com",
  messagingSenderId: "433625060545"
};

firebase.initializeApp(config);

const database = firebase.database();

database.ref().set({
  name:'Ross Burke',
  age: 42,
  job:{
    title:'Software Developer',
    company:'Google'
  },
  stressLevel: 6,
  location: {
    city:'Calgary',
    province:'Alberta'
  }
}).then(()=>{
  console.log('Data is saved');
}).catch((e)=>{
  console.log('Error:', e);
});

// database.ref('age').set(43);

// database.ref('attributes').set({height:179, weight:186})
// .then(()=>{
//   console.log('Attributes created')
// }).catch((e)=>{
//   console.log('Error:',e);
// })

database.ref('age').remove()
.then(()=>{
  console.log('Data was removed')
}).catch((e)=>{
  console.log('Error', e);
});

database.ref().update({
  name:'Jane Doe',
  age:43,
  'location/city':'Calgary'
});

// database.ref('location/province').remove()
// .then(()=>{
//   console.log('Province was removed')
// }).catch((e)=>{
//   console.log('Error', e)
// });

database.ref().update({
  'job/title':'Manager',
  'location/city':'Edmonton'
});

database.ref().update({
  stressLevel:9,
  'job/company':'Amazon',
  'location/city':'Lethbridge'
});

database.ref('location/city').once('value').then((snapshot)=>{
  const data = snapshot.val();
  console.log(data);
}).catch((e)=>{
  console.log('Error:', e);
});

// database.ref().on('value', (snapshot)=>{
//   console.log(snapshot.val());
// });

database.ref().update({
  stressLevel:4
})

const user = database.ref().on('value', (snapshot)=>{
  const data = snapshot.val();
  console.log(`${data.name} is a ${data.job.title} at ${data.job.company}.`);
},(e)=>{
  console.log('Error:', e);
})

database.ref().update({
  name: 'Ross Burke',
  'job/title': 'Developer',
  'job/company': 'Google'
})

// database.ref().off(user);

// const firebaseNotes = {
//   notes:{
//     12:{
//       title:'first note',
//       body:'this is my note'
//     },
//     13:{
//       title:'another note',
//       body: 'this is another note'
//     }
//   }
// }

// const notes = [{
//   id:'12',
//   title:'first note',
//   body:'this is my note'
// },
// {
//   id:'13',
//   title:'another note',
//   body: 'this is another note'
// }];

// database.ref('notes').set(notes);

// child_removed
database.ref('expenses')
.on('child_removed', (snapshot)=>{
  console.log(sanpshot.key, snapshot.val());
}, (e)=>{
  console.log('Error:',e);
});

// child_changed
database.ref('expenses')
.on('child_changed', (snapshot)=>{
  console.log(snapshot.key, snapshot.val());
}, (e)=>{
  console.log('Error:',e);
})

// database.ref('notes/-L9muV53ijMrlxzmvABz').update({body:'buy food'});

// database.ref('expenses')
// .once('value')
// .then((snapshot)=>{
//   const expenses = [];
//   snapshot.forEach((child)=>{
//     expenses.push({
//       id:child.key,
//       ...child.val()
//     });
//   });
//   console.log(expenses);
// });

database.ref('expenses')
.on('value', (snapshot)=>{
  const expenses = [];
  snapshot.forEach((child)=>{
    expenses.push({
      id:child.key,
      ...child.val()
    });
  });
  console.log(expenses);
},(e)=>{
  console.log('Error:',e);
});

// database.ref('expenses').push({
//   description:'Printer',
//   note:'Home office',
//   amount:24999,
//   createdAt:10
// });

// database.ref('expenses').push({
//   description:'Monitor',
//   note:'Office',
//   amount:49899,
//   createdAt:12
// });

// database.ref('expenses').push({
//   description:'Lunch with Dave LaPinzkie',
//   note:'Earls',
//   amount:7298,
//   createdAt:13
// });