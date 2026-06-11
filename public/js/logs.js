async function loadLogs(){

  const res = await fetch("/api/logs", {
    headers: { role: localStorage.getItem("role") }
  });

  const logs = await res.json();
  const container = document.getElementById("logs");

  container.innerHTML = logs.map(l => `
    <div class="panel">
      <b>[${l.time}]</b><br>
      Staff: ${l.staff}<br>
      Command: ${l.command}<br>
      Target: ${l.target}<br>
      Reason: ${l.reason || "None"}
    </div>
  `).join("");
}
