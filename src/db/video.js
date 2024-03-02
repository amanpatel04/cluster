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
    } catch (error) {
        console.log(`Error while saving image : ${error}`);
    }
}

module.exports = {
    videoCreate
}