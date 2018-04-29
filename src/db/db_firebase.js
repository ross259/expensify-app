import database from '../firebase/firebase';

const get = (node) => {
  return database.ref(node).once('value').then((snapshot)=>{
    return snapshot.val()
  });
}

const getExpenses = (node) => {
  return database.ref(node).once('value').then((snapshot)=>{
    const arr = [];
    snapshot.forEach((child)=>{
      arr.push({
        _id:child.key,
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
  data.forEach(({ _id, description, note, amount, createdAt })=>{
    dataSet[_id] = { description, _id, note, amount, createdAt };
  });
  return database.ref(node).set(dataSet);
}

const remove = (node) => {
  return database.ref(node).remove();
}

export { get, getExpenses, push, set, remove }
