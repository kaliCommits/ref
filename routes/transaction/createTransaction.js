const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const requestValidation = require("../../middleware/request-validate");
const BadRequestError = require("../../errors/BadRequestError");
const Transaction = require("../../model/Transaction");
const currentUser = require("../../middleware/current-user");
const requireAuth = require("../../middleware/required-auth");

router.post(
  "/api/v1/transaction",
  [
    body("to").trim(),
    body("amount").trim().isLength({ min: 1, max: 20 }),
    body("message").trim(),
  ],
  requestValidation,
  currentUser,
  requireAuth,
  async (req, res) => {
    // create transaction
    const obj = {
      ...req.body,
      from: req.currentUser.username,
      userId: req.currentUser.id,
    };
    console.log(obj);
    const transaction = Transaction.build(obj);
    await transaction.save();
    //    after creating transaction add transaction id to user
    // baki
    res.status(201).send(transaction);
  }
);

module.exports = router;
