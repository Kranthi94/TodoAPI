var mongoose = require('mongoose');

var validator = require('validator');

var jwt = require('jsonwebtoken');

var _ = require('lodash');

var UserSchema = new mongoose.Schema({
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

UserSchema.methods.toJSON = function () {
  var user = this;

  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {

  var user = this;

  var access = "auth";

  var token = jwt.sign({
    _id : user._id.toHexString(),
    access
  }, 'abc123').toString();

  user.tokens.push({
    access,
    token
  });

  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken = function (token) {

  var UserModel = this;

  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch(err) {
    return Promise.reject();
  }

  return UserModel.findOne({
    '_id' : decoded._id,
    'tokens.access' : 'auth',
    'tokens.token' : token
  });
}

var UserModel = mongoose.model('Users', UserSchema);

module.exports = {
  UserModel
};
