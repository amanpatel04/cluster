import { Router } from 'express';

import {
    getImageByPage,
    getImageById,
    deleteImageById,
} from '../controllers/image.js';
import auth from '../middlewares/auth.js';

export const router = Router();

router.route('/get').get(auth, getImageByPage);
router.route('/get/:id').get(auth, getImageById);
router.route('/delete/:id').delete(auth, deleteImageById);
