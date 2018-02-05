const {UserModel} = require('./../../models/user.js');

const {TodoModel} = require('./../../models/todo.js');

const {ObjectID} = require('mongodb');

const jwt = require('jsonwebtoken');

var userOneId = new ObjectID();

var userTwoId = new ObjectID();

const users = [{
  _id : userOneId,
  name : 'UserOne',
  email : 'abc@gmail.com',
  password: 'passone!',
  tokens : [{
    access : 'auth',
    token : jwt.sign({
      _id : userOneId,
      access : 'auth'
    }, 'abc123').toString()
  }]
}, {
  _id : userTwoId,
  name : 'UserTwo',
  email : 'xyz@gmail.com',
  password: 'passtwo!',
  tokens : [{
    access : 'auth',
    token : jwt.sign({
      _id : userTwoId,
      access : 'auth'
    }, 'abc123').toString()
  }]
}];

const populateUsers = (done) => {
  UserModel.remove({}).then(() => {

    var userOne = new UserModel(users[0]).save();

    var userTwo = new UserModel(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => {
    done();
  })
}

const todos = [{
  text : 'First todo to insert',
  _creator : userOneId
}, {
  text : 'Second todo to insert',
  _creator : userTwoId
}];

const populateTodos = (done) => {
    TodoModel.remove({}).then(() => {
      TodoModel.insertMany(todos).then(() => {
        done();
      })
    });
}

module.exports = {

}
