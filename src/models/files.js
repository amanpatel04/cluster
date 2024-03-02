
const modelFiles = async (conn) => {
    try {
        const res = await conn.query(`
            CREATE TABLE IF NOT EXISTS files (
                id INT PRIMARY KEY AUTO_INCREMENT,
                url VARCHAR(100) NOT NULL UNIQUE,
                title VARCHAR(50),
                size INT NOT NULL,
                file_type ENUM('image', 'video', 'audio', 'other') NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) AUTO_INCREMENT=101;
        `);
        console.log(`Table files created : ${res}`);
    } catch (error) {
        console.log(`Table files creation error : ${error}`);
    }
}

module.exports = { modelFiles };