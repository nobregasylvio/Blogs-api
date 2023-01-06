const express = require('express');
const { validateJWT } = require('../auth/validateJWT');
const userControler = require('../controllers/user.controller');

const userRoute = express.Router();

userRoute.get('/', validateJWT, userControler.getAll);
userRoute.get('/:id', validateJWT, userControler.getByUserId);

userRoute.post('/', userControler.insertUser);

userRoute.delete('/me');

module.exports = userRoute;