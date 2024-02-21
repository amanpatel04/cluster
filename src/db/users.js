
const modelUsers = async(conn) => {
    try {
        console.log(conn);
        const res = await conn.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY,
            username VARCHAR(30) NOT NULL UNIQUE,
            email VARCHAR(30) NOT NULL UNIQUE,
            first_name VARCHAR(20) NOT NULL,
            last_name VARCHAR(20),
            porfile VARCHAR(50) DEFAULT "default.jpg",
            size_allocated INT DEFAULT 0,
            size_used INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);
        `);
        console.log(`Table users created : ${res}`);
    } catch (error) {
        console.log(`Table user creation error : ${error}`);
    }
}

module.exports = { modelUsers };