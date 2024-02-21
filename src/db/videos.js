
const modelVideos = async(conn) => {
    try {
        const res = conn.query(`
            CREATE TABLE IF NOT EXISTS videos (
                id INT PRIMARY KEY,
                poster VARCHAR(50) NOT NULL DEFAULT "default.jpg",
                duration INT NOT NULL);
        `);
        console.log(`Table videos created : ${res}`);
    } catch (error) {
        console.log(`Table videos creation error : ${error}`);
    }
}

module.exports = { modelVideos };