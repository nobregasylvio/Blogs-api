const express = require('express');
const userControler = require('../controllers/user.controller');

const userRoute = express.Router();

userRoute.get('/');
userRoute.get('/:id');

userRoute.post('/', userControler.insertUser);

userRoute.delete('/me');

module.exports = userRoute;