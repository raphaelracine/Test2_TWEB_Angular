var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var port = process.env.port | 3000;

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'test-2'
    },
    port: port,
  },

  test: {
    root: rootPath,
    app: {
      name: 'test-2'
    },
    port: port,
  },

  production: {
    root: rootPath,
    app: {
      name: 'test-2'
    },
    port: port,
  }
};

module.exports = config[env];
