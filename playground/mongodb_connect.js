const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoAPI', (err, db) => {

  if (err) {
    return console.log('Unable to connect to database');
  }

  console.log('Succesfully connected to database');

  const myDB = db.db('TodoAPI');

  // myDB.collection('Todos').insertOne({
  //   title : 'Learn Node Js',
  //   completed : false
  // }, (err, res) => {
  //   if(err){
  //     return console.log('Unable to inser the item', err);
  //   }
  //
  //   console.log('Succesfully inserted the item');
  //
  //   console.log(JSON.stringify(res.ops, undefined, 2));
  // });

  myDB.collection('Users').insertOne({
    name: 'Kranthi',
    age: 24,
    location: 'Hyderabad',
    email: 'abc@gmail.com'
  }, (err, res) => {
    if (err) {
      return console.log('Unable to insert the user', err);
    }

    console.log('Succesfully inserted the user');

    console.log(JSON.stringify(res.ops, undefined, 2));
  })

  db.close();
});