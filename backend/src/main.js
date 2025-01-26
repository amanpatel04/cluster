import './utils/loadEnv.js';
import app from './app.js';
import dbConnect from './db/connect.js';

dbConnect()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(`Database connection error : ${error}`);
        process.exit(1);
    });
