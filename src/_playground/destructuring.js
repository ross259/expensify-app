// OBJECT DESTRUCTURING

const person = {
  name: 'Ross',
  age: 42,
  location: {
    city: 'Calgary',
    temp: -2
  }
}

console.log (`${person.name} is ${person.age}.`);

const {name = 'Anonymous', age} = person;

console.log (`${name} is ${age}.`);

const { city, temp: temperature } = person.location

console.log (`It is ${temperature} degrees in ${city}, the city where ${name} lives.`);

const {name: firstName = 'Anonymous'} = person;

console.log (`${firstName} is ${age}.`);



const book = {
  title: 'Ego is the Enemy',
  author: 'Ryan Holiday',
  publisher: {
    // name: 'Penguin'
  }
}

const {name: PublisherName = 'Self-Published'} = book.publisher;

console.log(PublisherName);



// ARRAY DESTRUCTURING

let address = ['1288', 'S Juniper Street', 'Calgary', 'Alberta', 'T2T 4G1']

address = ['1288', 'S Juniper Street', 'Calgary']

console.log(`You are in ${address[2]}, ${address[3]}.`)

const [, street, town, province='Nova Scotia', postal] = address;

console.log(`You are in ${town}, ${province}.`)



const item =['Coffee (hot)', '$2.00', '$2.50', '2.96']

const [drink, , medium] = item;

console.log(`A medium ${drink} costs ${medium}`);