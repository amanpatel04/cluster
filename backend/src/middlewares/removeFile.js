import { unlink } from 'fs';

const removeFile = (filePath) => {
    unlink(filePath, (err) => {
        if (err) throw err;
    });
};

export default removeFile;
