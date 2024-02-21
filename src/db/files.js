
const modelFiles = async (conn) => {
    try {
        const res = await conn.query(`
            CREATE TABLE IF NOT EXISTS files (
                id INT PRIMARY KEY,
                url VARCHAR(100) NOT NULL UNIQUE,
                title VARCHAR(50),
                size INT NOT NULL,
                file_type ENUM('image', 'video', 'audio', 'document', 'other') NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
        `);
        console.log(`Table files created : ${res}`);
    } catch (error) {
        console.log(`Table files creation error : ${error}`);
    }
}

module.exports = { modelFiles };