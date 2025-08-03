import { Router } from 'express';

import {
    getVideoByPage,
    getVideoMetaDataById,
    getVideoById,
    getPosterById,
    deleteVideoById,
} from '../controllers/video.js';
import auth from '../middlewares/auth.js';

export const router = Router();

router.route('/get').get(auth, getVideoByPage);
router.route('/get/blob/:id').get(auth, getVideoById);
router.route('/get/meta/:id').get(auth, getVideoMetaDataById);
router.route('/poster/:id').get(auth, getPosterById);
router.route('/delete/:id').delete(auth, deleteVideoById);
