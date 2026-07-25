const predictionHistory = [];

function addPrediction(symbol, signal, confidence) {

    predictionHistory.unshift({
        time: new Date().toLocaleTimeString(),
        symbol,
        signal,
        confidence
    });

    if (predictionHistory.length > 20) {
        predictionHistory.pop();
    }

    renderHistory();

}

function renderHistory() {

    const history = document.getElementById("history");

    history.innerHTML = "";

    predictionHistory.forEach(item => {

        history.innerHTML += `
            <p>
                ${item.time} |
                ${item.symbol} |
                ${item.signal} |
                ${item.confidence}%
            </p>
        `;

    });

}
