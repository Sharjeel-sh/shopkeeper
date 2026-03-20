const express = require("express");
const Customer = require("../models/Customer");
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);

router.post("/udhaar", async (req, res) => {
  try {
    const { customerId, amount, note, date } = req.body;

    if (!customerId || !amount) {
      return res.status(400).json({ message: "Customer and amount are required" });
    }

    const customer = await Customer.findOne({ _id: customerId, user: req.user.id });
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    const tx = await Transaction.create({
      user: req.user.id,
      customer: customerId,
      type: "UDHAAR",
      amount: Number(amount),
      note: note || "",
      date: date ? new Date(date) : new Date()
    });

    return res.status(201).json(tx);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/payment", async (req, res) => {
  try {
    const { customerId, amount, date } = req.body;

    if (!customerId || !amount) {
      return res.status(400).json({ message: "Customer and amount are required" });
    }

    const customer = await Customer.findOne({ _id: customerId, user: req.user.id });
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    const tx = await Transaction.create({
      user: req.user.id,
      customer: customerId,
      type: "PAYMENT",
      amount: Number(amount),
      note: "",
      date: date ? new Date(date) : new Date()
    });

    return res.status(201).json(tx);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
