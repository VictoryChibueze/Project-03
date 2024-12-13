const express = require("express");
const passport = require("passport");
const router = express.Router();

router.use("/", require("./swagger"));
router.get("/", (req, res) => {
  res.send("Hello World");
});

router.use("/players", require("./players"));
router.get("/login", passport.authenticate("github"), (req, res) => {});
module.exports = router;
