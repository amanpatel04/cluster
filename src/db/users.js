const {getConnection} = require("./connect");

const modelUsers = async() => {
    try {
        const conn = getConnection();
        const res = await conn.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(30) NOT NULL UNIQUE,
            email VARCHAR(30) NOT NULL UNIQUE,
            first_name VARCHAR(20) NOT NULL,
            last_name VARCHAR(20),
            porfile VARCHAR(50) DEFAULT "default.jpg",
            password VARCHAR(255) NOT NULL,
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

const insertUser = async(user = {}) => {
    try {
        const conn = getConnection();
        const res = await conn.query(`
            INSERT INTO users (username, email, first_name, last_name, password, profile) VALUES 
            ("${user.username}", "${user.email}", "${user.first_name}", "${user.last_name}", "${user.password}", "${user.profile}");
        `);
    } catch (error) {
        console.log(`Error while creating user : ${error}`);
    }
}

const getField = async (field, username) => {
    try {
        const conn = getConnection();
        const res = await conn.query(`
            SELECT ${field} FROM users WHERE username="${username}";
        `);
        return res;
    } catch (error) {
        console.log(`Error while fetching for login ${error}`);
        return null;
    }
}

const isExist = async(field, value) => {
    try {
        const conn = getConnection();
        const res = await conn.query(`
            SELECT ${field} FROM users WHERE ${field}="${value}";
        `);
        if (res.length === 0) {
            return false;
        }
        return true;
    } catch (error) {
        console.log(`Error while checking ${field} : ${error}`);
    }
    return true;
}

const test = async() => {
    try {
        const conn = getConnection();
        const res = await conn.query("SELECT name FROM test;");
        console.log(res);
    } catch (error) {
        console.log("test error : ", error);
    }
}

module.exports = { modelUsers, insertUser, test, isExist, getField};