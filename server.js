const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.static("public"));

let logs = [];
let punishments = [];
let shifts = {};
let serverStats = {
  players: 18,
  queue: 4,
  status: "ONLINE"
};

// MOCK MELONLY API STREAM
setInterval(() => {
  serverStats.players = Math.floor(Math.random() * 40);
  serverStats.queue = Math.floor(Math.random() * 10);
}, 3000);

// AUTH MIDDLEWARE (simple staff-only mock)
function staffOnly(req, res, next) {
  const role = req.headers["role"];
  if (!role || !["staff", "admin", "owner"].includes(role)) {
    return res.status(403).json({ error: "Staff only" });
  }
  next();
}

// LIVE SERVER DATA
app.get("/api/server", (req, res) => {
  res.json(serverStats);
});

// COMMAND LOGS
app.get("/api/logs", staffOnly, (req, res) => {
  res.json(logs);
});

// PUNISHMENTS
app.get("/api/punishments", staffOnly, (req, res) => {
  res.json(punishments);
});

// SHIFT SYSTEM
app.post("/api/shifts/add", staffOnly, (req, res) => {
  const { user, minutes, reason } = req.body;

  if (!shifts[user]) shifts[user] = 0;
  shifts[user] += minutes;

  res.json({ success: true, user, total: shifts[user] });
});

// MOCK MELONLY COMMAND RECEIVER
app.post("/api/melonly/command", (req, res) => {
  const { staff, command, target, reason } = req.body;

  const entry = {
    time: new Date().toLocaleTimeString(),
    staff,
    command,
    target,
    reason
  };

  logs.unshift(entry);

  if (command.includes("ban") || command.includes("kick")) {
    punishments.unshift(entry);
  }

  res.json({ success: true });
});

app.listen(3000, () => console.log("NovaLine Control Center running"));
