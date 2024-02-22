const mariadb = require('mariadb');

let conn;
const dbConnect = async() => {
    try {
        conn = await mariadb.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWD,
            database: process.env.DB_NAME
        });
        console.log(`Database connection established : ${conn.threadId}, database : ${conn.info.database}`);
    } catch (error) {
        console.log(`Databases connection error : ${error}`);
        process.exit(1);
    }
}

const getConnection = () => {
    return conn;
}

module.exports = { dbConnect, getConnection };