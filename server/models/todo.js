var mongoose = require('mongoose');

var TodoModel = mongoose.model('Todo', {
  text : {
    type : String,
    required : true,
    minlength : 1,
    trim : true
  },
  completed : {
    type : Boolean,
    default : false
  },
  completedAt : {
    type : String,
    default : null
  }
});

module.exports = {
  TodoModel
};
