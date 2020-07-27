const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const home = require("./route/home");
const heroes = require("./route/heroes");
const authenticator = require("./middleware/authenticator");
const logger = require("./middleware/logger");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(authenticator);
app.use(logger);
app.use("/", home);
app.use("/api/heroes", heroes);

mongoose
  .connect("mongodb://localhost/herodb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Db successfully ... "))
  .catch((err) =>
    console.log("Error has occured while connecting to db : ", err)
  );

app.listen(PORT, () => {
  console.log("Listning on Port : " + PORT);
});
