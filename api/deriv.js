/**
 * Derivative API Module
 * Handles derivative calculations and financial data analysis
 */

const DerivativeAPI = {
    /**
     * Calculate price derivative (rate of change)
     * @param {Array} prices - Array of price values
     * @returns {Array} Derivative values
     */
    calculatePriceDerivative: function(prices) {
        const derivatives = [];
        for (let i = 1; i < prices.length; i++) {
            derivatives.push(prices[i] - prices[i - 1]);\n        }
        return derivatives;
    },

    /**
     * Calculate second derivative (acceleration)
     * @param {Array} derivatives - Array of first derivative values
     * @returns {Array} Second derivative values
     */
    calculateSecondDerivative: function(derivatives) {
        const secondDerivatives = [];
        for (let i = 1; i < derivatives.length; i++) {
            secondDerivatives.push(derivatives[i] - derivatives[i - 1]);
        }
        return secondDerivatives;
    },

    /**
     * Calculate moving average
     * @param {Array} data - Array of data points
     * @param {number} period - Period for moving average
     * @returns {Array} Moving average values
     */
    calculateMovingAverage: function(data, period) {
        const movingAverages = [];
        for (let i = period - 1; i < data.length; i++) {
            const window = data.slice(i - period + 1, i + 1);
            const average = window.reduce((sum, val) => sum + val, 0) / period;
            movingAverages.push(average);
        }
        return movingAverages;
    },

    /**
     * Calculate momentum
     * @param {Array} prices - Array of price values
     * @param {number} period - Period for momentum calculation
     * @returns {Array} Momentum values
     */
    calculateMomentum: function(prices, period) {
        const momentum = [];
        for (let i = period; i < prices.length; i++) {
            momentum.push(prices[i] - prices[i - period]);
        }
        return momentum;
    },

    /**
     * Calculate RSI (Relative Strength Index)
     * @param {Array} prices - Array of price values
     * @param {number} period - Period for RSI calculation
     * @returns {Array} RSI values
     */
    calculateRSI: function(prices, period = 14) {
        const changes = [];
        for (let i = 1; i < prices.length; i++) {
            changes.push(prices[i] - prices[i - 1]);
        }

        let gains = 0, losses = 0;
        for (let i = 0; i < period; i++) {
            if (changes[i] > 0) gains += changes[i];
            else losses -= changes[i];
        }

        const avgGain = gains / period;
        const avgLoss = losses / period;
        const rs = avgGain / avgLoss;
        const rsi = 100 - (100 / (1 + rs));

        return rsi;
    },

    /**
     * Calculate volatility (standard deviation)
     * @param {Array} prices - Array of price values
     * @returns {number} Volatility value
     */
    calculateVolatility: function(prices) {
        const mean = prices.reduce((sum, val) => sum + val, 0) / prices.length;
        const squareDiffs = prices.map(val => Math.pow(val - mean, 2));
        const avgSquareDiff = squareDiffs.reduce((sum, val) => sum + val, 0) / prices.length;
        return Math.sqrt(avgSquareDiff);
    },

    /**
     * Calculate correlation between two datasets
     * @param {Array} data1 - First dataset
     * @param {Array} data2 - Second dataset
     * @returns {number} Correlation coefficient
     */
    calculateCorrelation: function(data1, data2) {
        const n = Math.min(data1.length, data2.length);
        const mean1 = data1.slice(0, n).reduce((sum, val) => sum + val, 0) / n;
        const mean2 = data2.slice(0, n).reduce((sum, val) => sum + val, 0) / n;

        let numerator = 0, denominator1 = 0, denominator2 = 0;
        for (let i = 0; i < n; i++) {
            const diff1 = data1[i] - mean1;
            const diff2 = data2[i] - mean2;
            numerator += diff1 * diff2;
            denominator1 += diff1 * diff1;
            denominator2 += diff2 * diff2;
        }

        return numerator / Math.sqrt(denominator1 * denominator2);
    },

    /**
     * Fetch derivative data from API
     * @param {string} symbol - Asset symbol
     * @param {string} timeframe - Time frame (1m, 5m, 1h, 1d, etc.)
     * @returns {Promise} API response with derivative data
     */
    fetchDerivativeData: async function(symbol, timeframe) {
        try {
            const response = await fetch(`/api/derivatives/${symbol}?timeframe=${timeframe}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching derivative data:', error);
            return null;
        }
    },

    /**
     * Analyze derivative trends
     * @param {Array} derivatives - Array of derivative values
     * @returns {Object} Trend analysis
     */
    analyzeTrends: function(derivatives) {
        const positiveCount = derivatives.filter(d => d > 0).length;
        const negativeCount = derivatives.filter(d => d < 0).length;
        const trend = positiveCount > negativeCount ? 'uptrend' : 'downtrend';

        return {
            trend: trend,
            positiveCount: positiveCount,
            negativeCount: negativeCount,
            ratio: (positiveCount / derivatives.length).toFixed(2)
        };
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DerivativeAPI;
}
