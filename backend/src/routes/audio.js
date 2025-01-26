import { Router } from 'express';

import auth from '../middlewares/auth.js';
import {
    getAudioByPage,
    getAudioById,
    deleteAudioById,
} from '../controllers/audio.js';

export const router = Router();

router.route('/get').get(auth, getAudioByPage);
router.route('/get/:id').get(auth, getAudioById);
router.route('/delete/:id').delete(auth, deleteAudioById);
