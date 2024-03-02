
const modelImage = async (conn) => {
    try {
        const res = await conn.query(`
            CREATE TABLE IF NOT EXISTS user_images (
                user_id INT NOT NULL,
                file_id INT UNIQUE NOT NULL,
                CONSTRAINT fk_image_user_id FOREIGN KEY (user_id) REFERENCES users(id),
                CONSTRAINT fk_image_file_id FOREIGN KEY (file_id) REFERENCES files(id),
                PRIMARY KEY (user_id, file_id) 
            );
        `);
        console.log(`image table created : ${res}`);
    } catch (error) {
        console.log(`Image model error ${error}`);
    }
}

module.exports = {modelImage};