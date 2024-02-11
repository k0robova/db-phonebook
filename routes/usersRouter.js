import express from 'express';
import { signup } from '../controllers/userControllers.js';
import { signupSchema } from '../schemas/userSchemas.js';
import validateBody from '../helpers/validateBody.js';

const userRouter = express.Router();

userRouter.post('/signup', validateBody(signupSchema), signup);
userRouter.post('/login');
userRouter.post('/logout');
userRouter.get('/current');

export default userRouter;
