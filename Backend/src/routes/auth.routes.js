import {Router} from 'express';
const authrouter = Router();
import authmiddleware from '../middlewares/auth.middleware.js';
import {registeruser,loginUser,logoutuser,getMe} from  '../controllers/userControllers.js'

authrouter.post('/register',registeruser);
authrouter.post('/login',loginUser);
authrouter.get('/logout', authmiddleware, logoutuser);
authrouter.get('/get-me', authmiddleware, getMe);


export default authrouter;
