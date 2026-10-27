const WebSocket = require("ws");
const readline = require("readline");

const PORT = 8080;
const MAX_NAME = 30;
const MAX_TEXT = 300;

const server = new WebSocket.Server({ port: PORT });

function broadcast(payload) {
    const data = JSON.stringify(payload);

    server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}

function onlineCount() {
    let count = 0;

    server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            count += 1;
        }
    });

    return count;
}

function sendOnline() {
    broadcast({ type: "online", count: onlineCount() });
}

function reject(socket, text) {
    socket.send(JSON.stringify({ type: "error", text }));
}

function handleChat(socket, message) {
    const name = String(message.name || "").trim();
    const text = String(message.text || "").trim();

    if (!name) {
        return reject(socket, "Введите имя перед отправкой сообщения");
    }

    if (!text) {
        return reject(socket, "Пустое сообщение не отправлено");
    }

    if (name.length > MAX_NAME || text.length > MAX_TEXT) {
        return reject(socket, `Имя не длиннее ${MAX_NAME} символов, сообщение не длиннее ${MAX_TEXT}`);
    }

    broadcast({ type: "chat", name, text, time: new Date().toISOString() });
}

server.on("connection", (socket) => {
    console.log("Клиент подключился");
    sendOnline();

    socket.on("message", (raw) => {
        let message;

        try {
            message = JSON.parse(raw.toString());
        } catch (error) {
            return reject(socket, "Сообщение не удалось разобрать");
        }

        if (message.type === "chat") {
            console.log("Сообщение:", message.name, "-", message.text);
            handleChat(socket, message);
        }
    });

    socket.on("close", () => {
        console.log("Клиент отключился");
        sendOnline();
    });

    socket.on("error", (error) => {
        console.log("Ошибка соединения:", error.message);
    });
});

// Каждая строка, введённая в консоль сервера, уходит всем покупателям как уведомление.
const input = readline.createInterface({ input: process.stdin });

input.on("line", (line) => {
    const text = line.trim();

    if (!text) {
        return;
    }

    console.log("Уведомление:", text);
    broadcast({ type: "notice", text, time: new Date().toISOString() });
});

console.log(`WebSocket-сервер Dream Sneakers запущен на порту ${PORT}`);
console.log("Введите текст и нажмите Enter, чтобы отправить уведомление всем клиентам");
