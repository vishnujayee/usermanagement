const express = require('express');
const adminMiddlewear = require('../middlewares/adminMiddlewear');
const {addRole , getUserInfo , getuserInfo ,updateUserInfo , deleteUser} = require("../controllers/userController");
const routes = express.Router();
// on signup user already created  so instead of createUser i will make api for adding role 
routes.post('/addrole' , adminMiddlewear ,addRole); // only admin will add role to users
routes.get('/page?pageNo',getUserInfo);
routes.get('/:id',getUserInfo);
routes.patch('/',updateUserInfo);
routes.delete('/:id',adminMiddlewear , deleteUser);
module.exports = routes;