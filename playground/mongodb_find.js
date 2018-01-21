const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoAPI', (err, db) => {

  if(err){
    return console.log('Unable to connect to database');
  }

  console.log('Succesfully connected to database');

  const myDB = db.db('TodoAPI');

  myDB.collection('Todos').find({completed : true}).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos');
  });

  myDB.collection('Users').find({
    _id : new ObjectId('5a6480ea1e56b0148e1b8447')
  }).toArray().then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch users');
  });

  myDB.collection('Users').find().count().then((count) => {
    console.log(`Users count : ${count}`);
  }, (err) => {
    console.log('Unable to fetch users count');
  });

  db.close();
});
