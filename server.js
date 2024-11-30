const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const mongodb = require("./db/database");
const cors = require("cors");
console.log(process.env.PORT);
console.log(process.env.MONGODB_URL);

/* *********************MIDDLEWARES************** */
app.use(bodyParser.json());
app.use("/", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use(cors());
const Port = process.env.PORT || 8080;
mongodb.initDb((err) => {
  if (err) {
    console.log(er);
  } else {
    app.listen(Port, () => {
      console.log(`Database is listen and node is running on ${Port}`);
    });
  }
});
