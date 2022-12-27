const express = require('express');

const categoriesRoute = express.Router();

categoriesRoute.get('/');
categoriesRoute.post('/');

module.exports = categoriesRoute;