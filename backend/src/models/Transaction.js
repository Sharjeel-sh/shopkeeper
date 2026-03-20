const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },
    type: {
      type: String,
      enum: ["UDHAAR", "PAYMENT"],
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    note: {
      type: String,
      trim: true,
      default: ""
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
