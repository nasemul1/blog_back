import express from 'express'
import { signup, signin, sendVerificationCode, verifyUser } from '../controllers/userController.js'
import validateUser from '../middlewares/validator.js';
import emailValidate from '../middlewares/emailValidate.js';

const userRouter = express.Router();

userRouter.post('/signup', validateUser, signup);
userRouter.post('/signin', validateUser, signin);
userRouter.post('/send-verification-code', emailValidate, sendVerificationCode);
userRouter.post('/verify-user', emailValidate, verifyUser);

export default userRouter;