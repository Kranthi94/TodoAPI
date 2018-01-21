const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoAPI', (err, db) => {

  if(err){
    return console.log('Unable to connect to database');
  }

  console.log('Succesfully connected to database');

  const myDB = db.db('TodoAPI');

  myDB.collection('Users').findOneAndUpdate({
    _id : new ObjectId('5a6480ea1e56b0148e1b8447')
  }, {
    $set : {
      name : 'Kiran',
    },
    $inc : {
      age : 1
    }
  }, {
    returnOriginal : false
  }).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
  });

  db.close();
});
