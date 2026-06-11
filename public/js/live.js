async function loadDashboard(){
  setInterval(async () => {
    const res = await fetch("/api/server");
    const data = await res.json();

    document.getElementById("players").innerText = `${data.players}/40`;
    document.getElementById("queue").innerText = data.queue;
    document.getElementById("status").innerText = data.players > 0 ? "ONLINE" : "OFFLINE";
  }, 2000);
}
