
const modelAudio = async(conn) => {
    try {
        const res = await conn.query(`
            CREATE TABLE IF NOT EXISTS audio (
                id INT PRIMARY KEY,
                duration INT NOT NULL);
        `);
        console.log(`Table audio created : ${res}`);
    } catch (error) {
        console.log(`Table audio creation error : ${error}`);
    }
}

module.exports = { modelAudio };