import { Router } from 'express';

import {
    getVideoByPage,
    getVideoById,
    deleteVideoById,
} from '../controllers/video.js';
import auth from '../middlewares/auth.js';

export const router = Router();

router.route('/get').get(auth, getVideoByPage);
router.route('/get/:id').get(auth, getVideoById);
router.route('/delete/:id').delete(auth, deleteVideoById);
