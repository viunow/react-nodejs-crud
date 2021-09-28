const express = require('express');
const cors = require('cors');
const path = require('path')

const cadastroRoutesFactory = require("./app/routes/cadastro.routes");

const app = express();

const db = require("./app/models");

db.sequelize.sync();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// Setting up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

cadastroRoutesFactory(app);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the api." });
});

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the api." });
});

// Roteando recursos publicos.
app.use('/resources', express.static(`${__dirname}/resources`));

app.get("*", (req, res) => {
  res.json({ message: "[404] - NOT FOUND." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
