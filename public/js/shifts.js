async function addShift(user, minutes, reason){

  await fetch("/api/shifts/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      role: localStorage.getItem("role")
    },
    body: JSON.stringify({ user, minutes, reason })
  });

  alert("Shift updated");
}
