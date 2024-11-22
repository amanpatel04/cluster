require("dotenv").config();

const {app} = require("./app");
const { dbConnect } = require("./db/connect");

dbConnect()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.log(`Database schema creation error : ${error}`);
    process.exit(1);
});
