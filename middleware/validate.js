const validator = require("../helpers/validate");

const savePlayer = (req, res, next) => {
  const validationRule = {
    name: "required|string",
    gender: "required|string",
    position: "required|string",
    clubPlayed: "",
    nationality: "required|string",
    birthday: "required|string",
    height: "required|string",
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        sucess: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  savePlayer,
};
