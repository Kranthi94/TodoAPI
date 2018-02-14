var env = process.env.NODE_ENV || 'development';

if(env === 'development' || env === 'test'){

  var configFile = require('config.json');

  var envConfig = configFile[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[env];
  });
}
