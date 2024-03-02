
const modelAudio = async(conn) => {
    try {
        const res = await conn.query(`
            CREATE TABLE IF NOT EXISTS user_audios (
                user_id INT NOT NULL,
                file_id INT UNIQUE NOT NULL,
                duration INT NOT NULL,
                CONSTRAINT fk_audio_user_id FOREIGN KEY (user_id) REFERENCES users(id),
                CONSTRAINT fk_audio_file_id FOREIGN KEY (file_id) REFERENCES files(id),
                PRIMARY KEY (user_id, file_id)
            );
        `);
        console.log(`Table audio created : ${res}`);
    } catch (error) {
        console.log(`Table audio creation error : ${error}`);
    }
}

module.exports = { modelAudio };