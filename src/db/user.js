const {getConnection} = require("./connect");

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

const getField = async (field, value) => {
    try {
        const conn = getConnection();
        const res = await conn.query(`
            SELECT ${field} FROM users WHERE username="${value}";
        `);
        return res;
    } catch (error) {
        console.log(`Error while fetching for login ${error}`);
        return null;
    }
}

const getFieldById = async (field, value) => {
    try {
        const conn = getConnection();
        const res = await conn.query(`
            SELECT ${field} FROM users WHERE id=${value};
        `);
        const user = res[0];
        delete user.password;
        return user;
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

const updateValue = async(field, value, id) => {
    try {
        const conn = getConnection();
        const res = await conn.execute(
            `UPDATE users SET ${field}="${value}" WHERE id=${id};`
        );
    } catch (error) {
        console.log(`Error while updating value : ${error}`);
    }
}

module.exports = { insertUser, isExist, getField, getFieldById, updateValue };