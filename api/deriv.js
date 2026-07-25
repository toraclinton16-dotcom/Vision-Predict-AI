// Deriv WebSocket API

const APP_ID = 1089;

let socket = null;
let connected = false;

function connectDeriv() {

    socket = new WebSocket(
        `wss://ws.derivws.com/websockets/v3?app_id=${APP_ID}`
    );

    socket.onopen = () => {

        connected = true;

        console.log("✅ Connected to Deriv");

        const status = document.getElementById("connectionStatus");

        if (status) {
            status.textContent = "🟢 Connected";
        }

        startScanner();

    };

    socket.onmessage = (event) => {

        const data = JSON.parse(event.data);

        processTick(data);

    };

    socket.onerror = (error) => {

        console.error(error);

        const status = document.getElementById("connectionStatus");

        if (status) {
            status.textContent = "🔴 Error";
        }

    };

    socket.onclose = () => {

        connected = false;

        const status = document.getElementById("connectionStatus");

        if (status) {
            status.textContent = "🟡 Reconnecting...";
        }

        setTimeout(connectDeriv, 3000);

    };

}

connectDeriv();
