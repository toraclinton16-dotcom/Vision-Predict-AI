// ===== Live Market Scanner =====

// Markets to monitor
const MARKETS = [
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
];

// Store latest tick for each market
const marketData = {};

// Subscribe to all markets
function startScanner() {

    if (!socket || socket.readyState !== WebSocket.OPEN) {
        return;
    }

    document.getElementById("scannerStatus").textContent =
        "🟢 Scanning Markets";

    MARKETS.forEach(symbol => {

        socket.send(JSON.stringify({
            ticks: symbol,
            subscribe: 1
        }));

    });

}

// Receive live ticks
function processTick(data) {

    if (!data.tick) return;

    marketData[data.tick.symbol] = {
        symbol: data.tick.symbol,
        price: data.tick.quote,
        epoch: data.tick.epoch
    };

    document.getElementById("marketCount").textContent =
        Object.keys(marketData).length;

    analyzeMarkets();

}
