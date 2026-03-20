const express = require("express");
const Customer = require("../models/Customer");
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);

router.post("/", async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Customer name is required" });
    }

    const customer = await Customer.create({
      user: req.user.id,
      name,
      phone: phone || ""
    });

    return res.status(201).json(customer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find({ user: req.user.id }).sort({ createdAt: -1 });

    // Add pending balance per customer for dashboard listing.
    const customerIds = customers.map((c) => c._id);
    const transactions = await Transaction.find({
      user: req.user.id,
      customer: { $in: customerIds }
    });

    const pendingMap = {};
    customers.forEach((c) => {
      pendingMap[c._id.toString()] = 0;
    });

    transactions.forEach((t) => {
      const key = t.customer.toString();
      if (t.type === "UDHAAR") pendingMap[key] += t.amount;
      if (t.type === "PAYMENT") pendingMap[key] -= t.amount;
    });

    const result = customers.map((c) => ({
      ...c.toObject(),
      pendingAmount: pendingMap[c._id.toString()] || 0
    }));

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id, user: req.user.id });
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    const transactions = await Transaction.find({
      user: req.user.id,
      customer: customer._id
    }).sort({ date: 1, createdAt: 1 });

    let runningBalance = 0;
    const txWithBalance = transactions.map((tx) => {
      if (tx.type === "UDHAAR") runningBalance += tx.amount;
      if (tx.type === "PAYMENT") runningBalance -= tx.amount;
      return { ...tx.toObject(), runningBalance };
    });

    return res.json({
      customer,
      runningBalance,
      transactions: txWithBalance
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
