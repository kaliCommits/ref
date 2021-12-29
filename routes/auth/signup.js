const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const Jwt = require("jsonwebtoken");
const User = require("../../model/User");
const requestValidation = require("../../middleware/request-validate");
const BadRequestError = require("../../errors/BadRequestError");
router.post(
  "/api/v1/signup",
  [
    body("username")
      .trim()
      .isLength({ min: 3, max: 15 })
      .withMessage("credential must be valid"),
    body("password")
      .trim()
      .isLength({ min: 8, max: 64 })
      .withMessage("credential must be valid"),
    body("wallet").trim().isLength({ max: 10 }),
  ],
  requestValidation,
  async (req, res, next) => {
    const { username, password } = req.body;
    console.log(username, password);
    const existingUser = await User.findOne({ username });
    console.log(existingUser);
    if (existingUser) {
      return next(new BadRequestError("username already taken"));
    }

    const user = User.build(req.body);
    await user.save();

    //jwt stuffs
    const userJwt = Jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      "asdf"
    );

    //making awailable as session
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

module.exports = router;
