const express = require('express');
const { validateJWT } = require('../auth/validateJWT');
const categoryController = require('../controllers/category.controller');

const categoriesRoute = express.Router();

categoriesRoute.get('/');
categoriesRoute.post('/', validateJWT, categoryController.insertCategory);

module.exports = categoriesRoute;