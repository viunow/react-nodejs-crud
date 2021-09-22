const express = require('express');
const cors = require('cors');

const app = express();

const db = require("./app/models");
db.sequelize.sync();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the home page." });
});

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the api." });
});

require("./app/routes/cadastro.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});