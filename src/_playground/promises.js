const promise = new Promise((res, rej) =>{
  setTimeout(()=>{
    res('This is my resolved data');
    // rej('Something went wrong')
  },5000)
})

promise.then((data)=>{
  console.log(data);
  return data
}).then((data)=>{
  console.log('Chain:', data)
}).then(()=>{
  return new Promise((res, rej) =>{
    setTimeout(()=>{
      res('This is my other promise');
      // rej('Something went wrong')
    },5000)
  })
}).then((str)=>{
  console.log('Promise resolved and returned:', str)
}).catch((error)=>{
  console.log('ERROR:', error)
});