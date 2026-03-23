const express = require("express");
const router = express.Router(); // ✅ THIS WAS MISSING

router.post("/predict", (req, res) => {
  const { devices } = req.body;

  if (!devices || devices.length === 0) {
    return res.json({
      prediction: "0 W",
      suggestion: "No data available"
    });
  }

  let totalPower = devices.reduce((sum, d) => sum + d.power, 0);
  let predicted = totalPower * 1.2;

  let suggestion = "";

  if (predicted > 2000) {
    suggestion = "⚠ High energy usage expected. Reduce AC usage.";
  } else if (predicted > 1000) {
    suggestion = "⚡ Moderate usage. Optimize usage.";
  } else {
    suggestion = "✅ Energy usage is efficient.";
  }

  res.json({
    prediction: predicted.toFixed(2) + " W",
    suggestion
  });
});

module.exports = router; // ✅ ALSO REQUIRED