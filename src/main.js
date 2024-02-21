require("dotenv").config();

const {app} = require("./app");
const { createSchema } = require("./db/createSchema");

createSchema()
.then( () => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}).catch( (error) => {
    console.log(`Server error : ${error}`);
});
