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
    res.render('wikipage', {
      page: page
    });
  })
  .catch(next);
})

wikiRouter.post('/', function(req, res, next) {
  console.log(req.body);
  var page = Page.create({
    title: req.body.title,
    content: req.body.content
  })
  .then((newPage) => res.redirect(newPage.route))
  .catch(err => console.error(err));
});



module.exports = wikiRouter;
