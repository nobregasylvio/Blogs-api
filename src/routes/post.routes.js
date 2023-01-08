const express = require('express');
const postController = require('../controllers/post.controller');
const { validateJWT } = require('../auth/validateJWT');

const postRoute = express.Router();

postRoute.get('/');
postRoute.get('/:id');
postRoute.get('/search');

postRoute.put('/:id');

postRoute.delete('/');

postRoute.post('/', validateJWT, postController.insertPost);

module.exports = postRoute;