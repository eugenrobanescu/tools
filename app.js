const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
var path = require("path");

const productsRoutes = require("./routes/productsRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const usersRoutes = require("./routes/userRoutes");
const ordersRoutes = require("./routes/ordersRoutes");

// Middleware-ul de jos este pentru a nu avea probleme cu..faptul Access-Controll etc
//Problemele de genul sunt la "legarea" dintre back-end si front-end care lucreaza pe diferite servere

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

// express.json ne permite sa citim requesturile de pe front-end in format json, altfel nu le-ar citi

app.use(express.json());

// cookieParser face acelasi lucru dar.. pentru cookie
app.use(cookieParser());

// Aici sunt rutele..principale , iar in folderul  routes o sa vezi rutele pentru fiecare parte din api
// Scopul lor e fix pentru a fi mai curat codul, ar fi un haos daca nu
app.use("/api/products", productsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", ordersRoutes);

// Aici exportam app pentru ca in server.js avem partea de server/ configul pentru baza de date si e mai clean asa
module.exports = app;
