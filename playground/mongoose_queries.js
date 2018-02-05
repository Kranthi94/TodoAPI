const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose.js');

const {TodoModel} = require('../server/models/todo.js');

const {UserModel} = require('../server/models/user.js');

var _todoid = '5a67646d7e2290030f0746b3';

var _userid = '5a64af5e698810163773b2fb';

if(!ObjectID.isValid(_todoid)){
  return console.log('Invalid todo id');
};

if(!ObjectID.isValid(_userid)){
  return console.log('Invalid user id');
};

TodoModel.find({
  _id : _todoid
}).then((todos) => {
  console.log('Todo : ', todos);
});

TodoModel.findOne({
  _id : _todoid
}).then((todos) => {
  console.log('First Todo : ', todos);
});

TodoModel.findById(_todoid).then((todos) => {
  console.log('Find by Todo : ', todos);
}).catch((err) => {
  console.log(err);m
});

UserModel.findById(_userid).then((users) => {

  if(!users){
    return console.log('Unable to find the user');
  }
  console.log('Find by User : ', users);
}).catch((err) => {
  console.log(err);
});
