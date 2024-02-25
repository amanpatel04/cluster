
const modelRelations = async (conn) => {
    try {
        const res = await conn.query(`
            CREATE TABLE IF NOT EXISTS user_files (
                user_id INT NOT NULL,
                file_id INT NOT NULL UNIQUE,
                CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id),
                CONSTRAINT fk_file_id FOREIGN KEY (file_id) REFERENCES files(id),
                PRIMARY KEY (user_id, file_id)
            );
        `);
        console.log(`Relation users to files created : ${res}`);
    } catch (error) {
        console.log(`Table user_files creation error : ${error}`);
    }
}

module.exports = { modelRelations };