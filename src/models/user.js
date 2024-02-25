const jwt = require("jsonwebtoken");

const modelUsers = async(conn) => {
    try {
        const res = await conn.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(30) NOT NULL UNIQUE,
            email VARCHAR(30) NOT NULL UNIQUE,
            first_name VARCHAR(20) NOT NULL,
            last_name VARCHAR(20),
            profile VARCHAR(50) DEFAULT "default.jpg",
            password VARCHAR(255) NOT NULL,
            refresh_token VARCHAR(255),
            size_allocated INT DEFAULT 0,
            size_used INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP) AUTO_INCREMENT=100001;
        `);
        console.log(`Table users created : ${res}`);
    } catch (error) {
        console.log(`Table user creation error : ${error}`);
    }
}

const genrateAccessToken = (uid, user, em) => {
    return jwt.sign(
        {
            _id: uid,
            email: em,
            username: user,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

const genrateRefreshToken = (uid) => {
    return jwt.sign(
        {
            _id: uid,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

module.exports = { modelUsers, genrateAccessToken, genrateRefreshToken };