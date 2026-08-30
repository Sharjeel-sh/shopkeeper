const { onRequest } = require("firebase-functions/v2/https");
const app = require("./backend/app");
const connectDB = require("./backend/config/db");

exports.api = onRequest({ region: "us-central1" }, async (req, res) => {
  try {
    await connectDB();
  } catch (error) {
    res.status(500).json({ message: "Database connection failed" });
    return;
  }
  app(req, res);
});
