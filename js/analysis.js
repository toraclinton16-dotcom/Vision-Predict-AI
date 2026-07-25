function analyzeMarkets() {

    const markets = Object.values(marketData);

    if (markets.length === 0) return;

    let bestMarket = null;
    let highestScore = -1;

    markets.forEach(market => {

        let score = 0;

        // Price movement
        if (market.price % 2 === 0) {
            score += 10;
        } else {
            score += 5;
        }

        // Temporary random factor (will be removed later)
        score += Math.floor(Math.random() * 90);

        if (score > highestScore) {
            highestScore = score;
            bestMarket = market;
        }

    });

    if (!bestMarket) return;

    document.getElementById("bestMarket").textContent =
        bestMarket.symbol;

    document.getElementById("selectedMarket").textContent =
        bestMarket.symbol;

    document.getElementById("confidence").textContent =
        highestScore + "%";

    if (highestScore >= 85) {

        document.getElementById("prediction").textContent = "🟢 RISE";
        document.getElementById("signalStrength").textContent = "VERY STRONG";

    } else if (highestScore >= 70) {

        document.getElementById("prediction").textContent = "🟡 WAIT";
        document.getElementById("signalStrength").textContent = "MODERATE";

    } else {

        document.getElementById("prediction").textContent = "🔴 FALL";
        document.getElementById("signalStrength").textContent = "WEAK";

    }

    document.getElementById("duration").textContent = "5 Ticks";

    calculateRisk(bestMarket.price);

    updateRanking();

}
