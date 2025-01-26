import { Router } from 'express';

import auth from '../middlewares/auth.js';
import {
    getOtherById,
    getOtherByPage,
    deleteOtherById,
} from '../controllers/other.js';

export const router = Router();

router.route('/get').get(auth, getOtherByPage);
router.route('/get/:id').get(auth, getOtherById);
router.route('/delete/:id').delete(auth, deleteOtherById);
