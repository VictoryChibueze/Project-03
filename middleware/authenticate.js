const isAuthenticate = (req, res, next) => {
  if (req.session.user === undefined) {
    return res.status(401).json("you do not have access");
  }
  next();
};

module.exports = {
  isAuthenticate,
};