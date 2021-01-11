const express = require('express');
const signInRouter = express.Router();

const userController = require('../src/controllers/User');

// Route Login

signInRouter.post('/signin', userController.signIn);

module.exports = signInRouter;
