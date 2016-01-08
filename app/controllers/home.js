var express = require('express'),
  router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
	res.render('index');
});

router.get('/templates/:template', function (req, res, next) {
	res.render('templates/' + req.params.template);
});
