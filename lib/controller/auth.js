const { Router } = require('express');
const userService = require('../services/user-service');
const UserService = require('../services/user-service');

const ONE_DAY_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/signup', (req, res, next) => {
    UserService
      .create(req.body)
      .then(user => {
        const token =  userService.makeToken(user);
        res.cookie('session', token, {
          maxAge: ONE_DAY_MS
        });
        res.send(user);
      })
      .catch(next);
  });
