const express = require('express');
const userRouter = express();
const models = require('../models');
const User = models.User;
const Page = models.Page;

userRouter.get('/', function (req, res, next) {
  User.findAll()
  .then(users => {
    res.render('users', {
      users: users
    })
  })
  .catch(next);
})

userRouter.get('/:id', function (req, res, next) {
  Promise.all([
    User.findOne({where: {id: req.params.id}}),
    Page.findAll({where: {authorId: req.params.id}})
  ])
  .then(results => {
    res.render('singleUser', {user: results[0], pages: results[1]});
  })
  .catch(next);
})

module.exports = userRouter;
