const {getConnection} = require("./connect");

const audioCreate = async(audio = {}) => {
    try {
        const conn = getConnection();
        const res = await conn.query(`
            INSERT INTO files (url, title, size, file_type)VALUES("${audio.url}", "${audio.title}", ${audio.size}, "audio");
        `);
        const rel = await conn.query(`
            INSERT INTO user_audios (user_id, file_id, duration) VALUES (${audio.user}, ${res.insertId}, ${audio.duration});
        `);
    } catch (error) {
        console.log(`Error while saving image : ${error}`);
    }
}

module.exports = {
    audioCreate
}