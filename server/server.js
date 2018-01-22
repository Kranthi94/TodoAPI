
var express = require('express');

var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');

var {TodoModel} = require('./models/todo.js');

var {UserModel} = require('./models/user.js');


var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {

  var todo = new TodoModel({
    text : req.body.text,
    completed : req.body.completed
  });

  todo.save().then((doc) => {
    res.status(200).send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.listen(8000, () => {
  console.log('Started on port 8000');
});

module.exports = {
  app
};

// var newTodo = new TodoModel({
//   text : 'Have Dinner'
// });
//
// newTodo.save().then((docs) => {
//   console.log(docs);
// }, (err) => {
//   console.log('Unable to insert todo');
// });
//
// var newUser = new UserModel({
//   name : 'Naveen',
//   age : 27,
//   location : 'Chennai',
//   email : 'navvenkumar2@gmail.com'
// });
//
// newUser.save().then((docs) => {
//   console.log(docs);
// }, (err) => {
//   console.log(err);
// });
