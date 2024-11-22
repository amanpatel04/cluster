const mongoose = require('mongoose')

const dbConnect = async() => {
    try {
		console.log(process.env.DB_URI)
		const dbConnection = await mongoose.connect(`${process.env.DB_URI}`);
		console.log(`Connected : ${dbConnection.connection.host}`);
    } catch (error) {
        console.log(`Databases connection error : ${error}`);
        process.exit(1);
    }
}


module.exports = { dbConnect };
