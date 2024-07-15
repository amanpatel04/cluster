const {getConnection} = require("./connect");

const videoCreate = async(video = {}) => {
    try {
        const conn = getConnection();
        const res = await conn.query(`
            INSERT INTO files (url, title, size, file_type)VALUES("${video.url}", "${video.title}", ${video.size}, "video");
        `);
        const rel = await conn.query(`
            INSERT INTO user_videos (user_id, file_id, poster, duration) VALUES (${video.user}, ${res.insertId}, "${video.poster}", ${video.duration});
        `);
        const sizeUsed = await conn.query(`
            UPDATE users SET sizeUsed = (SELECT sizeUsed from users where id = ${video.user}) + ${video.size};
        `);
    } catch (error) {
        console.log(`Error while saving image : ${error}`);
    }
}

const getVideoById = async(id) => {
    try {
        const conn = getConnection();
        const res = await conn.query(`
            select file.id, file.url, file.title, file.size, file.file_type, file.created_at, video.poster, video.duration from files file inner join user_videos video on file.id = video.file_id and video.user_id=${id};
        `);
        return res;
    } catch (error) {
        console.log(`Error while getting video by id : ${error}`);
        return null;
    }
}

module.exports = {
    videoCreate,
    getVideoById
}