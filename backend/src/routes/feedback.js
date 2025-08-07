import { Router } from "express";
import auth from "../middlewares/auth.js"
import { setFeedback, getNewFeedback, getAllFeedback } from "../controllers/feedback.js";
import upload from '../middlewares/multer.js'

export const router = Router();

router.route('/set').post(auth, upload.none(), setFeedback);
router.route('/unread').get(auth, getNewFeedback);
router.route('/all').get(auth, getAllFeedback);
