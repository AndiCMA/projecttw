const bodyParser = require("body-parser");
const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");

const db = require("./models");
const router = require("./routes");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
app.use(fileupload({createParentPath: true,}),);

app.use("/", router);

db.sequelize
  .sync()
  .then(() => {
    const port = 8080;
    app.listen(port, () => console.log("App is running on port " + port));
  });

  app.use("/", express.static("../front-end"));