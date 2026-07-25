// ===== Vision Predict AI Settings =====

const SETTINGS = {

    // Prediction duration (ticks)
    predictionDuration: 5,

    // Minimum confidence required
    minimumConfidence: 80,

    // Markets to scan
    enabledMarkets: [
        "R_10",
        "R_25",
        "R_50",
        "R_75",
        "R_100",
        "1HZ10V",
        "1HZ25V",
        "1HZ50V",
        "1HZ75V",
        "1HZ100V",
        "STPUSD"
    ],

    // Refresh interval (milliseconds)
    refreshRate: 1000,

    // Auto scan
    autoScan: true

};

function saveSettings(){

    SETTINGS.predictionDuration =
    Number(document.getElementById("durationInput").value);

    SETTINGS.minimumConfidence =
    Number(document.getElementById("confidenceInput").value);

    alert("Settings Saved");

}
