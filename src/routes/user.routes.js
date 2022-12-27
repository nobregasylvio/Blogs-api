const express = require('express');

const userRoute = express.Router();

userRoute.get('/');
userRoute.get('/:id');

userRoute.post('/');

userRoute.delete('/me');

module.exports = userRoute;