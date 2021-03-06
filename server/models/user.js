var mongoose = require('mongoose');

var validator = require('validator');

var jwt = require('jsonwebtoken');

var _ = require('lodash');

var bcrypt = require('bcrypt');

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
  }, process.env.JWT_SECRET).toString();

  user.tokens.push({
    access,
    token
  });

  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeToken = function(token) {

  console.log(token);

  var user = this;

  return user.update({
    $pull : {
      tokens : {token}
    }
  });
};

UserSchema.statics.findByCredentials = function (email, password) {

  var UserModel = this;

  return UserModel.findOne({
    'email' : email
  }).then((user) => {

    console.log(user);

    if(!user){
      return Promise.reject();
    }

    return new Promise(function(resolve, reject) {

      bcrypt.compare(password, user.password, (err, res) => {

        console.log(res);

        if(res){
          resolve(user);
        }else {
          reject();
        }
      });
    });
  });
};

UserSchema.statics.findByToken = function (token) {

  var UserModel = this;

  var decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch(err) {
    return Promise.reject();
  }

  return UserModel.findOne({
    '_id' : decoded._id,
    'tokens.access' : 'auth',
    'tokens.token' : token
  });
};

UserSchema.pre('save', function (next) {

  var user = this;

  if (user.isModified('password')) {

    bcrypt.genSalt(10, (err, salt) => {

      bcrypt.hash(user.password, salt, (err, hash) => {
          user.password = hash;
          next();
      });
    });
  }else {
    next();
  }
});

var UserModel = mongoose.model('Users', UserSchema);

module.exports = {
  UserModel
};
