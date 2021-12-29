const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const Jwt = require("jsonwebtoken");
const User = require("../../model/User");
const Password = require("../../util/Password");
const requestValidation = require("../../middleware/request-validate");
const BadRequestError = require("../../errors/BadRequestError");
router.post(
  "/api/v1/signin",
  [
    body("username").trim().isLength({ min: 3, max: 15 }),
    body("password").trim().isLength({ min: 8, max: 64 }),
  ],
  requestValidation,
  async (req, res, next) => {
    const { username, password } = req.body;
    console.log(username, password);

    const existingUser = await User.findOne({ username });
    console.log(existingUser);
    if (!existingUser) {
      return next(new BadRequestError("enter valid credentials"));
    }

    const varifiedPassword = await Password.toCompare(
      existingUser.password,
      password
    );

    if (!varifiedPassword) {
      return next(new BadRequestError("enter valid credentials"));
    }

    //jwt stuffs
    const userJwt = Jwt.sign(
      {
        id: existingUser.id,
        username: existingUser.username,
      },
      "asdf"
    );

    //making awailable as session
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

module.exports = router;
