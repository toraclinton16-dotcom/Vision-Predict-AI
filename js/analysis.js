function analyzeMarkets() {

    const markets = Object.values(marketData);

    if (markets.length === 0) return;

    let best = null;

    let highestScore = -1;

    markets.forEach(market => {

        if (market.prices.length < 10) return;

        const first = market.prices[0];
        const last = market.prices[market.prices.length - 1];

        const change = last - first;

        let score = 50;

        if (change > 0) {
            score += 20;
        } else if (change < 0) {
            score -= 20;
        }

        // Recent momentum
        let rising = 0;

        for (let i = 1; i < market.prices.length; i++) {
            if (market.prices[i] > market.prices[i - 1]) {
                rising++;
            }
        }

        score += rising;

        if (score > highestScore) {
            highestScore = score;
            best = market;
        }

    });

    if (!best) return;

    const lastPrice = best.prices[best.prices.length - 1];

    document.getElementById("bestMarket").textContent = best.symbol;
    document.getElementById("selectedMarket").textContent = best.symbol;

    const result = generateSignal(best);

    document.getElementById("prediction").textContent =
        result.signal;

    document.getElementById("confidence").textContent =
        result.confidence + "%";

    document.getElementById("signalStrength").textContent =
        result.strength;

    document.getElementById("duration").textContent =
        SETTINGS.predictionDuration + " Ticks";

    calculateRisk(lastPrice);

    addPrediction(
        best.symbol,
        result.signal,
        result.confidence
    );

    updateRanking();
}
