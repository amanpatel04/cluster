import { Router } from 'express';

import auth from '../middlewares/auth.js';
import {
    getAudioByPage,
    getAudioMetaDataById,
    getAudioById,
    deleteAudioById,
} from '../controllers/audio.js';

export const router = Router();

router.route('/get').get(auth, getAudioByPage);
router.route('/get/blob/:id').get(auth, getAudioById);
router.route('/get/meta/:id').get(auth, getAudioMetaDataById);
router.route('/delete/:id').delete(auth, deleteAudioById);
