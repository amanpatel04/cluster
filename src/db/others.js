
const modelOthers = async (conn) => {
    try {
        const res = await conn.query(`
            CREATE TABLE IF NOT EXISTS others (
                id INT PRIMARY KEY,
                extenstion VARCHAR(10) NOT NULL);
        `);
        console.log(`Table other created : ${res}`);
    } catch (error) {
        console.log(`Table other creation error : ${error}`);
    }
}

module.exports = { modelOthers };