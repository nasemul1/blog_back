import express from 'express'
import { signup, signin } from '../controllers/userController.js'
import validateUser from '../middlewares/validator.js';

const userRouter = express.Router();

userRouter.post('/signup', validateUser, signup);
userRouter.post('/signin', validateUser, signin);

export default userRouter;