import {Router} from 'express';
const authrouter = Router();
import {registeruser} from '../controllers/UserControllers.js'

authrouter.post('/register',registeruser);


export default authrouter;
