const API = "http://localhost:3002";

export async function analyze(form) {
  const fd = new FormData();
  if (form.image) fd.append("image", form.image);

  fd.append("skinGoal", form.skinGoal);
  fd.append("hairGoal", form.hairGoal);
  fd.append("environment", form.environment);

  fd.append("sleep", String(form.sleep));
  fd.append("stress", String(form.stress));
  fd.append("hydration", String(form.hydration));

  const res = await fetch(`${API}/api/analyze`, { method: "POST", body: fd });
  if (!res.ok) throw new Error("Analyze failed");
  return res.json();
}

export async function getHistory() {
  const res = await fetch(`${API}/api/history`);
  if (!res.ok) throw new Error("History failed");
  return res.json();
}

export async function getHistoryItem(id) {
  const res = await fetch(`${API}/api/history/${id}`);
  if (!res.ok) throw new Error("History item failed");
  return res.json();
}

export async function whatIf(base, scenario) {
  const res = await fetch(`${API}/api/whatif`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ base, scenario }),
  });
  if (!res.ok) throw new Error("What-if failed");
  return res.json();
}
