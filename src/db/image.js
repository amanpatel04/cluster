const {getConnection} = require("./connect");

const imageCreate = async(image = {}) => {
    try {
        const conn = getConnection();
        const res = await conn.query(`
            INSERT INTO files (url, title, size, file_type)VALUES("${image.url}", "${image.title}", ${image.size}, "image");
        `);
        const rel = await conn.query(`
            INSERT INTO user_images (user_id, file_id) VALUES (${image.user}, ${res.insertId});
        `);
        const sizeUsed = await conn.query(`
            UPDATE users SET sizeUsed = (SELECT sizeUsed from users where id = ${image.user}) + ${image.size};
        `);
        console.log(sizeUsed);
    } catch (error) {
        console.log(`Error while saving image : ${error}`);
    }
}

const getImageById = async (id) => {
    try {
        const conn = getConnection();
        const res = await conn.query(`
            SELECT * FROM files WHERE id IN (SELECT file_id FROM user_images WHERE user_id=${id});
        `);
        return res;
    } catch (error) {
        console.log(`Error while getting image by id : ${error}`);
        return null;
    }
}

module.exports = {
    imageCreate,
    getImageById
}