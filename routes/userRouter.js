import express from 'express'
import { signup, signin, sendVerificationCode, verifyUser, sendForgotPasswordCode, recoverPassword } from '../controllers/userController.js'
import { validateUser, emailValidate, recoverPassValidator } from '../middlewares/validator.js';

const userRouter = express.Router();

userRouter.post('/signup', validateUser, signup);
userRouter.post('/signin', validateUser, signin);
userRouter.post('/send-verification-code', emailValidate, sendVerificationCode);
userRouter.post('/verify-user', emailValidate, verifyUser);
userRouter.post('/send-forgot-password-code', emailValidate, sendForgotPasswordCode);
userRouter.post('/recover-password', recoverPassValidator, recoverPassword);

export default userRouter;