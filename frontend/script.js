// =======================
// 📦 GLOBAL STATE
// =======================
let devices = [];

// =======================
// 💾 LOAD + SAVE (LOCAL)
// =======================
function loadDevices() {
  const stored = localStorage.getItem("devices");
  devices = stored ? JSON.parse(stored) : [];
  render();
}

function saveDevices() {
  localStorage.setItem("devices", JSON.stringify(devices));
}

// =======================
// 📂 NAVIGATION
// =======================
function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  if (id === "analytics") {
    updateAnalytics();
    generateAdvancedAnalytics(); // 🔥 NEW
  }
}

// =======================
// ➕ ADD DEVICE
// =======================
function addDevice() {
  const name = document.getElementById("name").value;
  const room = document.getElementById("room").value || "General";
  const power = +document.getElementById("power").value;

  if (!name || !power) return;

  devices.push({
    name,
    room,
    power,
    status: "ON"
  });

  saveDevices();
  render();
}

// =======================
// 🔁 TOGGLE DEVICE
// =======================
function toggleDevice(index) {
  devices[index].status =
    devices[index].status === "ON" ? "OFF" : "ON";

  saveDevices();
  render();
}

// =======================
// ❌ DELETE DEVICE
// =======================
function deleteDevice(index) {
  devices.splice(index, 1);
  saveDevices();
  render();
}

// =======================
// 🧠 HEALTH LOGIC
// =======================
function getHealth(power) {
  if (power > 1500) return "critical";
  if (power > 500) return "warning";
  return "good";
}

// =======================
// 🎯 MAIN RENDER
// =======================
function render() {
  let total = 0;

  const table = document.getElementById("deviceTable");
  if (table) table.innerHTML = "";

  devices.forEach((d, i) => {
    if (d.status === "ON") total += d.power;

    const health = getHealth(d.power);

    if (table) {
      table.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${d.name}</td>
          <td>${d.room}</td>
          <td>${d.power} W</td>

          <td>
            <span class="${d.status === "ON" ? "status-on" : "status-off"}">
              ${d.status}
            </span>
          </td>

          <td>
            <span class="health-${health}">
              ${health}
            </span>
          </td>

          <td>${(d.power / 1000).toFixed(2)} kWh</td>

          <td>
            <button class="btn-on" onclick="toggleDevice(${i})">
              ${d.status === "ON" ? "Turn Off" : "Turn On"}
            </button>
            <button class="btn-delete" onclick="deleteDevice(${i})">
              Delete
            </button>
          </td>
        </tr>
      `;
    }
  });

  updateDashboard(total);
}

// =======================
// 📊 DASHBOARD UPDATE
// =======================
function updateDashboard(total) {
  const powerEl = document.getElementById("currentPower");
  const energyEl = document.getElementById("totalEnergy");
  const billEl = document.getElementById("bill");

  if (powerEl) powerEl.innerText = total + " W";
  if (energyEl) energyEl.innerText = (total / 1000).toFixed(2) + " kWh";
  if (billEl) billEl.innerText = "₹" + (total * 0.008).toFixed(2);
}

// =======================
// 📊 BASIC ANALYTICS
// =======================
function updateAnalytics() {
  if (devices.length === 0) return;

  let max = devices.reduce((a, b) => (a.power > b.power ? a : b));
  let avg = devices.reduce((s, d) => s + d.power, 0) / devices.length;

  document.getElementById("highest").innerText = max.name;
  document.getElementById("average").innerText = avg.toFixed(1) + "W";
  document.getElementById("count").innerText = devices.length;
}

// =======================
// 🚀 ADVANCED ANALYTICS
// =======================
let hourlyChart, roomChart;

function generateAdvancedAnalytics() {

  if (devices.length === 0) return;

  // 🕒 Hourly trend (based on total power)
  const total = devices.reduce((sum, d) => sum + d.power, 0);

  const hourly = Array.from({ length: 24 }, (_, i) =>
    Math.max(10, Math.floor(total * (Math.random() * 0.05)))
  );

  drawHourlyChart(hourly);

  // 🏠 Room-wise aggregation
  const roomMap = {};

  devices.forEach(d => {
    if (!roomMap[d.room]) roomMap[d.room] = 0;
    if (d.status === "ON") roomMap[d.room] += d.power;
  });

  const rooms = Object.keys(roomMap);
  const values = Object.values(roomMap);

  drawRoomChart(rooms, values);

  // 📦 Room Cards
  const container = document.getElementById("roomCards");
  if (!container) return;

  container.innerHTML = "";

  rooms.forEach(room => {
    container.innerHTML += `
      <div class="room-card">
        <h3>${room}</h3>
        <p>${(roomMap[room] / 1000).toFixed(2)} kWh</p>
        <small>Daily usage</small>
      </div>
    `;
  });
}

// =======================
// 📊 CHARTS
// =======================
function drawHourlyChart(data) {
  const ctx = document.getElementById("hourlyChart");
  if (!ctx) return;

  if (hourlyChart) hourlyChart.destroy();

  hourlyChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [...Array(24).keys()],
      datasets: [{
        label: "Energy",
        data
      }]
    }
  });
}

function drawRoomChart(labels, data) {
  const ctx = document.getElementById("roomChart");
  if (!ctx) return;

  if (roomChart) roomChart.destroy();

  roomChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Usage",
        data
      }]
    }
  });
}

// =======================
// 📱 SIDEBAR
// =======================
function toggleSidebar() {
  document.querySelector(".sidebar").classList.toggle("active");
}

// =======================
// ⚡ HERO EFFECT (FIXED)
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero");
  const glow = hero?.querySelector(".cursor-glow");

  if (!hero) return;

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (glow) {
      glow.style.left = x + "px";
      glow.style.top = y + "px";
    }

    for (let i = 0; i < 2; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.innerText = "⚡";

      p.style.left = x + "px";
      p.style.top = y + "px";

      const dx = (Math.random() - 0.5) * 50;
      const dy = (Math.random() - 0.5) * 50;

      p.style.setProperty("--x", dx + "px");
      p.style.setProperty("--y", dy + "px");

      hero.appendChild(p);
      setTimeout(() => p.remove(), 700);
    }
  });
});

// =======================
// 🚨 ALERT SYSTEM (SMART)
// =======================
async function sendAlert() {
  try {
    const threshold = 400;
    const alertBox = document.getElementById("alertBox");

    let triggered = false;

    alertBox.innerHTML = ""; // reset

    for (const d of devices) {
      if (d.power > threshold && d.status === "ON") {
        triggered = true;

        const res = await fetch("http://localhost:5000/send-alert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            deviceName: d.name,
            temperature: d.power,
            limit: threshold
          })
        });

        const data = await res.json();

        const alert = document.createElement("div");
        alert.className = "alert-item";

        alert.innerHTML = `
          ⚠ <b>${d.name}</b> exceeded limit!<br>
          Usage: ${d.power}W (Limit: ${threshold}W)<br>
          📧 ${data.message}
        `;

        alertBox.appendChild(alert);
      }
    }

    if (!triggered) {
      alertBox.innerHTML = `
        <div class="alert-item safe">
          ✅ All devices are safe
        </div>
      `;
    }

  } catch (err) {
    console.error(err);
  }
}

// =======================
// 🤖 AI PREDICTION
// =======================
async function getPrediction() {
  try {
    const res = await fetch("http://localhost:5000/energy/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ devices })
    });

    const data = await res.json();

    const box = document.getElementById("aiBox");

    box.innerHTML = `
      <div class="ai-card">
        <h3>🤖 AI Prediction</h3>
        <p><strong>Future Usage:</strong> ${data.prediction}</p>
        <p>${data.suggestion || "Optimize usage during peak hours"}</p>
      </div>
    `;

  } catch (err) {
    console.error(err);
  }
}

// =======================
// 🚀 INIT
// =======================
loadDevices();