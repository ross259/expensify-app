import database from '../firebase/firebase';

const push = (node, object) => {
  return database.ref(node).push(object);
}

const get = (node) => {
  return database.ref(node).once('value').then((snapshot)=>{
    return snapshot.val()
  });
}

export { push, get }