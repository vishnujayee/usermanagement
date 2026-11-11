const express = require('express');
const {handleLogin , handleSignup , getAcessToken} = require('../controllers/authController');
const {validateLogin , validateSignup} = require("../middlewares/ValidationMiddlewear");
const routes = express.Router();
routes.post('/signup',validateSignup,handleSignup);
routes.post('/login' ,validateLogin, handleLogin);
routes.get('/accessToken', getAcessToken);
module.exports = routes;