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

const getAudioById = async (id) => {
    try {
        const conn = getConnection();
        const res = await conn.query(`
            select file.id, file.url, file.title, file.size, file.file_type, file.created_at, audio.duration from files file inner join user_audios audio on file.id = audio.file_id and audio.user_id=${id};
        `);
        return res;
    } catch (error) {
        console.log(`Error while getting audio by id : ${error}`);
        return null;
    }
}

module.exports = {
    audioCreate,
    getAudioById
}