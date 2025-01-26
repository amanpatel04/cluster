import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use((req, res, next) => {
    console.log(`${req.method} : ${req.url}`);
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

// middelware
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

import { router as usersRouter } from './routes/users.js';
import { router as imageRouter } from './routes/image.js';
import { router as audioRouter } from './routes/audio.js';
import { router as otherRouter } from './routes/other.js';
import { router as videoRouter } from './routes/video.js';
import { router as fileRouter } from './routes/file.js';

app.use('/api/v1/user', usersRouter);
app.use('/api/v1/image', imageRouter);
app.use('/api/v1/audio', audioRouter);
app.use('/api/v1/other', otherRouter);
app.use('/api/v1/video', videoRouter);
app.use('/api/v1/file', fileRouter);

export default app;
