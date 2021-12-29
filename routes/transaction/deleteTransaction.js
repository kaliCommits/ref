const express = require("express");
const router = express.Router();
const Transaction = require("../../model/Transaction");
const User = require("../../model/User");
const BadRequestError = require("../../errors/BadRequestError");
const currentUser = require("../../middleware/current-user");
const requireAuth = require("../../middleware/required-auth");

router.delete(
  "/api/v1/transaction/:id",
  currentUser,
  requireAuth,
  async (req, res, next) => {
    const foundedTransaction = await Transaction.findOne({
      _id: req.params.id,
    });
    if (!foundedTransaction) {
      return next(new BadRequestError("transaction not found"));
    }
    if (foundedTransaction.userId != req.currentUser.id) {
      return next(new BadRequestError("you are not an owner of transaction"));
    }

    const { to, from, amount } = foundedTransaction;
    console.log(to, from);
    const toUser = await User.findOne({ username: to }); // plus
    const fromUser = await User.findOne({ username: from }); //minus

    console.log(toUser, fromUser);

    // const toUserWallet = (
    //   parseInt(toUser.amount) + parseInt(amount)
    // ).toString();
    // const fromUserWallet = (
    //   parseInt(fromUser.amount) - parseInt(amount)
    // ).toString();
    // console.log(toUserWallet, fromUserWallet);

    console.log(toUser.wallet);
    console.log(amount);
    console.log(fromUser.wallet);
    const wallet = parseInt(toUser.wallet) + parseInt(amount).toString();
    console.log(wallet);

    toUser.set({
      ...toUser,
      wallet: (parseInt(toUser.wallet) + parseInt(amount)).toString(),
    });
    fromUser.set({
      ...fromUser,
      wallet: (parseInt(fromUser.wallet) - parseInt(amount)).toString(),
    });
    await toUser.save();
    await fromUser.save();
    await foundedTransaction.delete();
    res.status(200).send({});
  }
);

module.exports = router;
