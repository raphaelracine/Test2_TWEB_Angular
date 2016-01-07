var express = require('express'),
  router = express.Router(),
  Article = require('../models/article');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
	res.render('index', {
		title: "An implementation of GitHub API"
	});
});

router.get('/templates/:template', function (req, res, next) {
	res.render('templates/' + req.params.template);
});
