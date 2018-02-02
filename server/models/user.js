var mongoose = require('mongoose');

var validator = require('validator');

var UserModel = mongoose.model('Users', {
  name : {
    type : String,
    required : true,
    trim : true,
    minlength : 1
  },
  email : {
    type : String,
    required : true,
    minlength : 1,
    trim : true,
    unique : true,
    validate : {
        validator : validator.isEmail,
        message : '${VALUE} is not a valid email'
    }
  },
  password : {
    type : String,
    required : true,
    minlength : 6
  },
  tokens : [{
    access : {
      type : String,
      required : true
    },
    token : {
      type : String,
      required : true
    }
  }]
});

module.exports = {
  UserModel
};
