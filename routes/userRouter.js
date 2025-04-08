import express from 'express'
import { signup, signin, sendVerificationCode, verifyUser, sendForgotPasswordCode, recoverPassword, changePassword } from '../controllers/userController.js'
import { validateUser, emailValidate, recoverPassValidator, changePasswordValidator } from '../middlewares/validator.js';
import auth from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/signup', validateUser, signup);
userRouter.post('/signin', validateUser, signin);
userRouter.post('/send-verification-code', emailValidate, sendVerificationCode);
userRouter.post('/verify-user', emailValidate, verifyUser);
userRouter.post('/send-forgot-password-code', emailValidate, sendForgotPasswordCode);
userRouter.post('/recover-password', recoverPassValidator, recoverPassword);
userRouter.put('/change-password', changePasswordValidator, auth, changePassword);

export default userRouter;