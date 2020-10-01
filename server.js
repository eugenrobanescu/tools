const app = require("./app");
// dotenv ne citeste.. enviromentul -- adica config.env, acolo o sa fie port/db / jwt_secret/cand sa expire un cookie
const dotenv = require("dotenv");

const mongoose = require("mongoose");
// aici spunem pe care sa il citeasca
dotenv.config({ path: "config.env" });

const DB = process.env.DATABASE;

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB connection successful!"))
    .catch((err) => {
        console.log(err);
    });

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
