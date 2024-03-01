const {getConnection} = require("./connect");

const imageCreate = async(image = {}) => {
    try {
        const conn = getConnection();
        const res = await conn.query(`
            INSERT INTO files (url, title, size, file_type)VALUES("${image.url}", "${image.title}", ${image.size}, "image");
        `);
        const rel = await conn.query(`
            INSERT INTO user_files (user_id, file_id) VALUES (${image.user}, ${res.insertId});
        `);
    } catch (error) {
        console.log(`Error while saving image : ${error}`);
    }
}

module.exports = {
    imageCreate
}