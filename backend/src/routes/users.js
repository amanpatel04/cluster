import { Router } from 'express';
import {
    userRegister,
    userVerify,
    login,
    logout,
    loginRenew,
    getUserInfo,
    isLoggedIn,
    userDelete,
    userResendLink,
} from '../controllers/user.js';
import upload from '../middlewares/multer.js';
import auth from '../middlewares/auth.js';

export const router = Router();

router.route('/register').post(upload.single('profileImg'), userRegister);
router.route('/verify/resend').get(auth, userResendLink);
router.route('/verify').get(userVerify);
router.route('/login').post(upload.none(), login);
router.route('/logout').get(auth, logout);
router.route('/renew').get(loginRenew);
router.route('/info').get(auth, getUserInfo);
router.route('/isloggedin').get(auth, isLoggedIn);
router.route('/delete').delete(auth, userDelete);
