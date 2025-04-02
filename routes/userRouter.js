import express from 'express'
import { signup } from '../controllers/userController.js'
import validateUser from '../middlewares/validator.js';

const userRouter = express.Router();

userRouter.post('/signup', validateUser, signup);

export default userRouter;