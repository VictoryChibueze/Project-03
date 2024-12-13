const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongodb = require("./db/database");
const indexRoute = require("./routes/index");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;

const app = express();
/* *********************MIDDLEWARES************** */
app
  .use(bodyParser.json())
  .use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use("/", (req, res, next) => {
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
  })
  .use(cors({ methods: ["POST", "GET", "PUT", "PATCH", "DELETE", "OPTIONS"] }))
  .use(cors({ origin: "*" }))
  .use("/", indexRoute);
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (acessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

const Port = process.env.PORT || 8080;
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : "Logged out"
  );
});

app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);
mongodb.initDb((err) => {
  if (err) {
    console.log(er);
  } else {
    app.listen(Port, () => {
      console.log(`Database is listen and node is running on ${Port}`);
    });
  }
});
