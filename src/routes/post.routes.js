const express = require('express');

const postRoute = express.Router();

postRoute.get('/');
postRoute.get('/:id');
postRoute.get('/search');

postRoute.put('/:id');

postRoute.delete('/');

postRoute.post('/');

module.exports = postRoute;