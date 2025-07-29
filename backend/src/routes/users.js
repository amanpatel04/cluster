import { Router } from 'express';
import {
    userRegister,
    login,
    logout,
    loginRenew,
    getUserInfo,
    isLoggedIn,
} from '../controllers/user.js';
import upload from '../middlewares/multer.js';
import auth from '../middlewares/auth.js';

export const router = Router();

router.route('/register').post(upload.single('profileImg'), userRegister);
router.route('/login').post(upload.none(), login);
router.route('/logout').get(auth, logout);
router.route('/renew').get(loginRenew);
router.route('/get/info').get(auth, getUserInfo);
router.route('/isloggedin').get(auth, isLoggedIn);
