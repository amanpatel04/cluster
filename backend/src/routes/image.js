import { Router } from 'express';

import { get } from '../controllers/image.js';
import auth from '../middlewares/auth.js';

export const router = Router();

router.route('/get').get(auth, get);
