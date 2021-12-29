const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const Transaction = require("../../model/Transaction");
const BadRequestError = require("../../errors/BadRequestError");
const requestValidation = require("../../middleware/request-validate");
const currentUser = require("../../middleware/current-user");
const requireAuth = require("../../middleware/required-auth");

router.put(
  "/api/v1/transaction/:id",
  [
    body("to").trim(),
    body("amount").trim().isLength({ min: 1, max: 20 }),
    body("message").trim(),
  ],
  requestValidation,
  currentUser,
  requireAuth,
  async (req, res, next) => {
    const foundedTransaction = await Transaction.findOne({
      _id: req.params.id,
    });
    if (!foundedTransaction) {
      return next(new BadRequestError("Transaction not exist"));
    }
    if (foundedTransaction.userId != req.currentUser.id) {
      return next(new BadRequestError("you are not an owner of transaction"));
    }
    const updated = foundedTransaction.set({
      to: req.body.to,
      from: req.currentUser.username,
      amount: req.body.amount,
      message: req.body.message,
    });
    await foundedTransaction.save();

    res.status(200).send(updated);
  }
);

module.exports = router;
