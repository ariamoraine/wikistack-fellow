const express = require('express');
const wikiRouter = express();
const models = require('../models');
const Page = models.Page;
const User = models.User;

wikiRouter.get('/', function(req, res, next) {
  res.redirect('/');
});

wikiRouter.get('/add', function(req, res, next) {
  res.render('addPage');
});

wikiRouter.get('/:pageName', (req, res, next) => {
  Page.findOne({
    where: {
      urlTitle: req.params.pageName
    }
  })
  .then(page => {
    console.log(page);
    res.render('wikipage', {
      page: page
    });
  })
  .catch(next);
})

wikiRouter.post('/', function(req, res, next) {
  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .then((values) => {
    var user = values[0];
    Page.create({
      title: req.body.title,
      content: req.body.content,
    })
    .then((newPage) => {
      return newPage.setAuthor(user);
    })
    .then((newPage) => {
      res.redirect(newPage.route)
    })
  })
  .catch(err => console.error(err));
});



module.exports = wikiRouter;
