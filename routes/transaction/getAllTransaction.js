const express = require("express");
const router = express.Router();
const Transaction = require("../../model/Transaction");

router.get("/api/v1/transaction", async (req, res) => {
  console.log(req.query);
  const reqQuery = { ...req.query };
  let query;

  //delete all fields in reqQuery;
  const removeFields = ["select", "sort", "limit", "page"];
  removeFields.forEach((field) => delete reqQuery[field]);
  console.log(reqQuery);

  // converting into str
  let queryStr = JSON.stringify(reqQuery);
  console.log(queryStr);

  //adding $oeprator for mongo

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  //converting str into obj;

  query = Transaction.find(JSON.parse(queryStr));

  //split select and etc and join into str form for mongoose select method;
  if (req.query.select) {
    const field = req.query.select.split(",").join(" ");
    console.log(field);
    query = query.select(field);
  }

  //sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  //pagination (limit and page)
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Transaction.countDocuments();
  query = query.skip(startIndex).limit(limit);

  //pagaination
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit: limit,
    };
  }

  const allTransaction = await query;
  res.status(200).send({ total, pagination, allTransaction });
});

module.exports = router;
