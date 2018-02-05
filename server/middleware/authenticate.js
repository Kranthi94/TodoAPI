var {UserModel} = require('../models/user.js');

var authenticate = (req, res, next) => {

  var token = req.header('x-auth');

  UserModel.findByToken(token).then((user) => {

    console.log(user);

    if(!user){
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();

  }).catch((err) => {
    res.status(401).send();
  });
};

module.exports = {
  authenticate
};
