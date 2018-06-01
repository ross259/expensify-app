import database, { firebase, googleAuthProvider } from '../firebase/firebase';
import AppRouter, { history } from '../routers/AppRouter';

// EXPENSES

const get = (node) => {
  return database.ref(node).once('value').then((snapshot) => {
    return snapshot.val()
  });
}

const getExpenses = (node) => {
  return database.ref(node).once('value').then((snapshot) => {
    const arr = [];
    snapshot.forEach((child) => {
      arr.push({
        _id: child.key,
        ...child.val()
      });
    });
    return arr
  });
}

const push = (node, data) => {
  return database.ref(node).push(data);
}

const set = (node, data) => {
  const dataSet = {};
  data.forEach(({ _id, description, note, amount, createdAt }) => {
    dataSet[_id] = { description, _id, note, amount, createdAt };
  });
  return database.ref(node).set(dataSet);
}

const updateExpense = (node, data) => {
  console.log('UPDATING:', node, data);
  return database.ref(node).update(data)
}

const remove = (node) => {
  return database.ref(node).remove();
}

// const whoAreYou = () => {
//   console.log('I am firebase');
// }

// AUTHENTICATION

const signInWithGoogle = () => {
  return firebase.auth().signInWithPopup(googleAuthProvider)
    .then(() => {
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    })
}

const signOut = () => {

  return firebase.auth().signOut()
    .then(() => {
      history.push('/');
    });
}


export { get, getExpenses, push, set, updateExpense, remove, signInWithGoogle, signOut }
