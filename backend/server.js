const express = require("express");
const cors = require("cors");

const sendEmail = require("./services/emailService"); // ✅ ONLY ONCE
const energyRoutes = require("./routes/energy");

const app = express();

app.use(cors());
app.use(express.json());

// ENERGY ROUTES
app.use("/energy", energyRoutes);

// ALERT ROUTE
app.post("/send-alert", async (req, res) => {
  try {
    const { deviceName, temperature, limit } = req.body;

    const message = `
⚠ ENERGY ALERT!

Device: ${deviceName}
Temperature: ${temperature}°C
Limit: ${limit}°C

Action Required Immediately!
`;

    await sendEmail(message);

    res.json({
      success: true,
      message: "📧 Email Alert Sent!"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to send alert"
    });
  }
});

// START SERVER
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});