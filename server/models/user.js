var mongoose = require('mongoose');

var UserModel = mongoose.model('Users', {
  name : {
    type : String,
    required : true,
    trim : true,
    minlength : 1
  },
  age : {
    type : Number,
    required : true,
    minlength : 1,
    trim : true
  },
  location : {
    type : String,
    required : false
  },
  email : {
    type : String,
    required : true,
    minlength : 1,
    trim : true
  }
});

module.exports = {
  UserModel
};
