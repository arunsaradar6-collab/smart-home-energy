# ⚡ Smart Home Energy Monitor & Optimizer

A modern web-based system to monitor, analyze, and optimize household energy consumption in real-time with AI-driven insights.

---

## 🚀 Features

### 🔌 Device Monitoring
- Add and manage appliances dynamically
- Track power usage (W) and energy (kWh)
- Real-time ON/OFF control
- Health status detection (Good / Warning / Critical)

### 📊 Analytics Dashboard
- Hourly Energy Consumption Trend
- Room-wise Energy Comparison
- Device usage distribution
- Highest usage detection
- Average consumption insights

### 🤖 AI Prediction
- Predict future energy consumption
- Suggest optimization strategies
- Helps reduce electricity bills

### 🚨 Smart Alerts
- Detect high power usage
- Send Email Alerts using Nodemailer
- Alert UI display in dashboard

### 💾 Real-Time Data Storage
- LocalStorage-based persistence (frontend)
- Backend API integration support

---

## 🛠 Tech Stack

### 💻 Frontend
- HTML5
- CSS3 (Modern UI with gradients & glassmorphism)
- JavaScript (Vanilla JS)
- Chart.js (Data visualization)

### ⚙ Backend
- Node.js
- Express.js
- Nodemailer (Email Alerts)

### 🔗 Others
- REST API
- JSON data handling

---

## 📁 Project Structure

│
├── backend/
│ ├── routes/
│ │ └── energy.js
│ ├── services/
│ │ ├── aiService.js
│ │ ├── emailService.js
│ ├── data/
│ │ └── devices.json
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── index.html
│ ├── styles.css
│ ├── script.js
│ └── charts.js
│
└── README.md
