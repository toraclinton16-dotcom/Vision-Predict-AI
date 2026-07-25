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

    const symbol = data.tick.symbol;
    const price = Number(data.tick.quote);

    if (!marketData[symbol]) {
        marketData[symbol] = {
            symbol,
            prices: []
        };
    }

    marketData[symbol].prices.push(price);

    // Keep only the latest 30 ticks
    if (marketData[symbol].prices.length > 30) {
        marketData[symbol].prices.shift();
    }

    document.getElementById("marketCount").textContent =
        Object.keys(marketData).length;

    analyzeMarkets();

}
