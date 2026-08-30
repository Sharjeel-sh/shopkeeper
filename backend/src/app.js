const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Udhaar Tracker API running" });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/customers", require("./routes/customers"));
app.use("/api/transactions", require("./routes/transactions"));
app.use("/api/dashboard", require("./routes/dashboard"));

module.exports = app;
