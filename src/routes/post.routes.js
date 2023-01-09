const express = require('express');
const postController = require('../controllers/post.controller');
const { validateJWT } = require('../auth/validateJWT');

const postRoute = express.Router();

postRoute.get('/', validateJWT, postController.getAllPost);
postRoute.get('/:id', validateJWT, postController.getByPostId);
postRoute.get('/search');

postRoute.put('/:id');

postRoute.delete('/:id', validateJWT, postController.deleteByPostId);

postRoute.post('/', validateJWT, postController.insertPost);

module.exports = postRoute;