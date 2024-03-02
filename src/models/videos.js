
const modelVideos = async(conn) => {
    try {
        const res = conn.query(`
            CREATE TABLE IF NOT EXISTS user_videos (
                user_id INT NOT NULL,
                file_id INT UNIQUE NOT NULL,
                poster VARCHAR(50) NOT NULL DEFAULT "default.jpg",
                duration INT NOT NULL,
                CONSTRAINT fk_video_user_id FOREIGN KEY (user_id) REFERENCES users(id),
                CONSTRAINT fk_video_file_id FOREIGN KEY (file_id) REFERENCES files(id),
                PRIMARY KEY (user_id, file_id)
            );
        `);
        console.log(`Table videos created : ${res}`);
    } catch (error) {
        console.log(`Table videos creation error : ${error}`);
    }
}

module.exports = { modelVideos };