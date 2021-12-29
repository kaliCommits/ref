const express = require("express");
const currentUser = require("../../middleware/current-user");
const requireAuth = require("../../middleware/required-auth");
const router = express.Router();

router.get("/api/v1/currentuser", currentUser, requireAuth, (req, res) => {
  console.log(req.currentUser);
  res.send({ currentUser: req.currentUser || null });
});

module.exports = router;
