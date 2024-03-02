
const modelOthers = async (conn) => {
    try {
        const res = await conn.query(`
            CREATE TABLE IF NOT EXISTS user_others (
                user_id INT NOT NULL,
                file_id INT NOT NULL UNIQUE,
                extenstion VARCHAR(10) NOT NULL,
                CONSTRAINT fk_other_user_id FOREIGN KEY (user_id) REFERENCES users(id),
                CONSTRAINT fk_other_file_id FOREIGN KEY (file_id) REFERENCES files(id),
                PRIMARY KEY (user_id, file_id)
            );
        `);
        console.log(`Table other created : ${res}`);
    } catch (error) {
        console.log(`Table other creation error : ${error}`);
    }
}

module.exports = { modelOthers };