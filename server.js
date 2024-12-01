const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const mongodb = require("./db/database");
const indexRoute = require("./routes/index");
const cors = require("cors");

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
app.use("/", indexRoute);

console.log(process.env.PORT);
console.log(process.env.MONGODB_URL);

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
