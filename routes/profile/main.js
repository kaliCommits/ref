const express = require("express");
const router = express.Router();
const currentUser = require("../../middleware/current-user");
const requireAuth = require("../../middleware/required-auth");
const Transaction = require("../../model/Transaction");

router.get("/api/v1/profile", currentUser, requireAuth, async (req, res) => {
  const foundedTransactions = await Transaction.find({
    userId: req.currentUser.id,
  });
  res.send(foundedTransactions);
});

module.exports = router;
