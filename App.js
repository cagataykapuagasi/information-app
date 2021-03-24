require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
const Api = require("./routes");
const { sequelize } = require("./db/db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

sequelize.sync().then(() => {
  server.listen(port, () => {
    console.log(`Running Port: ${port}`);
  });
});

app.use("/api", Api);

app.all("*", (req, res) => {
  res.status(404).send({ message: "Not Found" });
});
