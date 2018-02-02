var config = require('./config/config.js');

var _ = require('lodash');

var express = require('express');

var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');

var {TodoModel} = require('./models/todo.js');

var {UserModel} = require('./models/user.js');

var {ObjectID} = require('mongodb');

var app = express();

const port = process.env.PORT || 8000;

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

app.get('/todos', (req, res) => {

    TodoModel.find().then((todos) => {
      res.send({
        todos
      });
    }, (err) => {
      res.send(err);
    });
});

app.get('/todos/:id', (req, res) => {

    var id = req.params.id;

    if(!ObjectID.isValid(id)){
      return res.status(404).send();
    }

    TodoModel.findById(id).then((todos) => {

        if(!todos){
          return res.status(404).send({});
        }

        res.status(200).send({todos});

    }).catch((err) => {
        res.status(400).send({});
    })
})

app.delete('/todos/:id', (req, res) => {

    var id = req.params.id;

    if(!ObjectID.isValid(id)){
      return res.status(404).send();
    }

    TodoModel.findByIdAndRemove(id).then((todos) => {

        if(!todos){
          return res.status(404).send({});
        }

        res.status(200).send({todos});

    }).catch((err) => {
        res.status(400).send({});
    })
});

app.patch('/todos/:id', (req, res) => {

    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    var body = _.pick(req.body, ['text', 'completed']);

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else {
        body.completed = false;
        body.completedAt = null;
    }

    TodoModel.findByIdAndUpdate(id, {$set : body}, {new : true}).then((todo) => {

        if(!todo){
          return res.status(404).send({});
        }

        res.status(200).send({todo});

    }).catch((err) => {
        res.status(400).send({});
    });
});

// <--User API Calls-->

app.post('/user', (req, res) => {

    var body = _.pick(req.body, ['name', 'email', 'password']);

    var user = new UserModel(body);

    console.log(user);

    user.save().then((user) => {
      res.status(200).send({user});
    }).catch((err) => {
      res.status(404).send();
    });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
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
