import express from 'express';
import {
  current,
  login,
  logout,
  signup,
} from '../controllers/userControllers.js';
import { loginSchema, signupSchema } from '../schemas/userSchemas.js';
import validateBody from '../helpers/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';

const userRouter = express.Router();

userRouter.post('/signup', validateBody(signupSchema), signup);
userRouter.post('/login', validateBody(loginSchema), login);
userRouter.post('/logout', authenticate, logout);
userRouter.get('/current', authenticate, current);

export default userRouter;
