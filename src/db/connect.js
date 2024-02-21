const mariadb = require('mariadb');

const dbConnect = async() => {
    try {
        const conn = await mariadb.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWD,
            database: process.env.DB_NAME
        });
        console.log(`Database connection established : ${conn.threadId}`);
        return conn;
    } catch (error) {
        console.log(`Databases connection error : ${error}`);
    }
}

module.exports = { dbConnect };