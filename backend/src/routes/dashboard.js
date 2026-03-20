const express = require("express");
const Customer = require("../models/Customer");
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);

router.get("/", async (req, res) => {
  try {
    const [customers, transactions] = await Promise.all([
      Customer.find({ user: req.user.id }),
      Transaction.find({ user: req.user.id })
    ]);

    let totalUdhaarGiven = 0;
    let totalReceived = 0;

    const pendingMap = {};
    customers.forEach((c) => {
      pendingMap[c._id.toString()] = 0;
    });

    transactions.forEach((tx) => {
      const key = tx.customer.toString();
      if (tx.type === "UDHAAR") {
        totalUdhaarGiven += tx.amount;
        pendingMap[key] += tx.amount;
      } else {
        totalReceived += tx.amount;
        pendingMap[key] -= tx.amount;
      }
    });

    const customerPending = customers
      .map((c) => ({
        _id: c._id,
        name: c.name,
        phone: c.phone,
        pendingAmount: pendingMap[c._id.toString()] || 0
      }))
      .filter((c) => c.pendingAmount > 0)
      .sort((a, b) => b.pendingAmount - a.pendingAmount);

    return res.json({
      totalUdhaarGiven,
      totalReceived,
      remainingBalance: totalUdhaarGiven - totalReceived,
      customerPending
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
