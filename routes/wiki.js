const express = require('express');
const wikiRouter = express();
const models = require('../models');
const Page = models.Page;
const User = models.User;

wikiRouter.get('/', function(req, res, next) {
  res.redirect('/');
});

wikiRouter.post('/', function(req, res, next) {
  console.log(req.body);
  var page = Page.create({
    title: req.body.title,
    content: req.body.content
  })
  .then((newPage) => res.send(newPage))
  .catch(err => console.error(err));
});

wikiRouter.get('/add', function(req, res, next) {
  res.render('addPage');
});

module.exports = wikiRouter;
