const SERVER_URL = "ws://localhost:8080";
const RECONNECT_DELAY = 3000;

const statusEl = document.getElementById("status");
const onlineEl = document.getElementById("online");
const noticesEl = document.getElementById("notices");
const messagesEl = document.getElementById("messages");
const errorEl = document.getElementById("error");
const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send");

let socket = null;

function setStatus(kind, text) {
    statusEl.className = `status status--${kind}`;
    statusEl.textContent = text;
    sendButton.disabled = kind !== "open";
}

function formatTime(iso) {
    return new Date(iso).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}

function addMessage(name, text, time) {
    const item = document.createElement("li");
    item.className = "message";

    const author = document.createElement("span");
    author.className = "message__author";
    author.textContent = name;

    const stamp = document.createElement("span");
    stamp.className = "message__time";
    stamp.textContent = formatTime(time);

    const body = document.createElement("div");
    body.textContent = text;

    item.append(author, stamp, body);
    messagesEl.appendChild(item);
    messagesEl.scrollTop = messagesEl.scrollHeight;
}

function addNotice(text, time) {
    const item = document.createElement("div");
    item.className = "notice";
    item.textContent = text;

    const stamp = document.createElement("span");
    stamp.className = "notice__time";
    stamp.textContent = formatTime(time);
    item.appendChild(stamp);

    noticesEl.prepend(item);
}

function handleMessage(event) {
    const data = JSON.parse(event.data);

    if (data.type === "chat") {
        addMessage(data.name, data.text, data.time);
    } else if (data.type === "notice") {
        addNotice(data.text, data.time);
    } else if (data.type === "online") {
        onlineEl.textContent = `Онлайн: ${data.count}`;
    } else if (data.type === "error") {
        errorEl.textContent = data.text;
    }
}

function connect() {
    setStatus("connecting", "Подключение…");
    socket = new WebSocket(SERVER_URL);

    socket.addEventListener("open", () => {
        setStatus("open", "Подключено");
        errorEl.textContent = "";
    });

    socket.addEventListener("message", handleMessage);

    socket.addEventListener("close", () => {
        setStatus("closed", "Отключено");
        onlineEl.textContent = "Онлайн: 0";
        setTimeout(connect, RECONNECT_DELAY);
    });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const text = messageInput.value.trim();

    if (!name) {
        errorEl.textContent = "Введите имя перед отправкой сообщения";
        nameInput.focus();
        return;
    }

    if (!text) {
        errorEl.textContent = "Пустое сообщение не отправлено";
        return;
    }

    if (!socket || socket.readyState !== WebSocket.OPEN) {
        errorEl.textContent = "Нет соединения с сервером";
        return;
    }

    errorEl.textContent = "";
    socket.send(JSON.stringify({ type: "chat", name, text }));
    messageInput.value = "";
    messageInput.focus();
});

connect();
