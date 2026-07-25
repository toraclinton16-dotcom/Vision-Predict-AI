/**
 * Ranking Module
 * Handles ranking and sorting of results
 */

function updateRanking() {

    const tbody = document.getElementById("rankingBody");

    tbody.innerHTML = "";

    const list = Object.values(marketData);

    list.sort((a, b) => {
        const priceA = a.prices[a.prices.length - 1] || 0;
        const priceB = b.prices[b.prices.length - 1] || 0;
        return priceB - priceA;
    });

    list.forEach((market, index) => {

        const latestPrice =
            market.prices.length > 0
                ? market.prices[market.prices.length - 1]
                : "--";

        const row = `
        <tr>
            <td>${index + 1}</td>
            <td>${market.symbol}</td>
            <td>${latestPrice}</td>
            <td>Scanning</td>
            <td>${SETTINGS.predictionDuration} Ticks</td>
        </tr>`;

        tbody.innerHTML += row;

    });

}

const Ranking = {
    rankResults: function(results) {
        // Rank results by relevance or priority
    },
    
    sortByScore: function(items) {
        // Sort items by score
    },
    
    applyWeights: function(results, weights) {
        // Apply custom weights to ranking
    }
};
