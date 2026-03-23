// backend/services/aiService.js

function predictEnergy(devices) {
    if (!devices || devices.length === 0) return 0;

    let total = devices.reduce((sum, d) => sum + d.power, 0);

    // Simple AI logic (can explain in hackathon)
    let prediction = total * (Math.random() * 0.2 + 0.9);

    return prediction.toFixed(2);
}

module.exports = { predictEnergy };