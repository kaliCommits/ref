const mongoose = require("mongoose");
const User = require("./User");

const transactionSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      required: [true, "please add amount receiver"],
      trim: true,
    },
    from: {
      type: String,
      required: [true, "please add transaction owner"],
      trim: true,
    },
    amount: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 20,
      required: [true, "please add amount to be pay"],
    },
    message: {
      type: String,
      required: [true, "please add message"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

transactionSchema.statics.build = (attr) => {
  return new Transaction(attr);
};

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
