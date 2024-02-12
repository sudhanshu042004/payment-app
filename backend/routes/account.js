const express = require("express");
const { authMiddleware } = require("../middleware/middleware");
const { Account, User } = require("../db/db");
const { default: mongoose } = require("mongoose");
const router = express.Router();

//balance request
router.get("/balance", authMiddleware, async (req, res) => {
  const userAccount = await Account.findOne({
    userId: req.userId,
  });
  const user = await User.findOne({
    _id: req.userId,
  });
  return res.status(200).json({
    balance: userAccount.balance,
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
  });
});

//transfer request
router.post("/transfer", authMiddleware, async (req, res) => {
  const body = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  const { to, amount } = req.body;
  const account = await Account.findOne({ userId: req.userId });
  if (!account || account.balance < amount) {
    session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }
  const toAccount = await Account.findOne({ userId: to });
  if (!toAccount) {
    session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  //transaction
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } },
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } },
  ).session(session);

  session.commitTransaction();
  return res.status(200).json({
    message: "Transfer successful",
  });
});

module.exports = router;
