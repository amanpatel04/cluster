import { Router } from 'express';
import { uploadFile } from '../controllers/file.js';
import upload from '../middlewares/multer.js';
import auth from '../middlewares/auth.js';

export const router = Router();

router.route('/upload').post(auth, upload.single('fileUpload'), uploadFile);
