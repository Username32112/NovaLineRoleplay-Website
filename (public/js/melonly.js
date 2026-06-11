async function sendCommand(staff, command, target, reason){

  await fetch("/api/melonly/command", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      staff,
      command,
      target,
      reason
    })
  });

}
