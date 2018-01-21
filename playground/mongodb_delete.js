const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoAPI', (err, db) => {

  if(err){
    return console.log('Unable to connect to database');
  }

  console.log('Succesfully connected to database');

  const myDB = db.db('TodoAPI');

  // delete Many returns no fo documents affected

  myDB.collection('Todos').deleteMany({completed : false}).toArray().then((result) => {
    console.log(result);
  }, (err) => {
    console.log('Unable to delete todos');
  });

  // delete one deletes the first object returns the no of documents affected

  myDB.collection('Todos').deleteOne({completed : false}).toArray().then((result) => {
    console.log(result);
  }, (err) => {
    console.log('Unable to delete todos');
  });

  // delete the first object and return the object value

  myDB.collection('Todos').findOneAndDelete({completed : false}).toArray().then((result) => {
    console.log(result);
  }, (err) => {
    console.log('Unable to delete todos');
  });

  db.close();
});
