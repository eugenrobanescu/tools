const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
var path = require("path");

const productsRoutes = require("./routes/productsRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const usersRoutes = require("./routes/userRoutes");
const ordersRoutes = require("./routes/ordersRoutes");

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});

app.use(express.json());
app.use(cookieParser());

app.use("/api/products", productsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", ordersRoutes);

module.exports = app;
