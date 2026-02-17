// assets/js/stats-sheets.js
// GA4 → Apps Script → JSON → GitHub Pages
// Ustaw w <head>:
// window.AldeaStatsConfig = { endpoint: "https://script.google.com/macros/s/.../exec" }

(function () {
  const REFRESH_MS = 60000;
  const GEO_URL = "https://ipapi.co/json/";

  function el(id) { return document.getElementById(id); }

  function setList(ol, items, emptyText) {
    if (!ol) return;
    ol.innerHTML = "";
    if (!items || items.length === 0) {
      const li = document.createElement("li");
      li.textContent = emptyText || "—";
      li.style.opacity = "0.8";
      ol.appendChild(li);
      return;
    }
    items.forEach(it => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${it.label}</span><strong>${it.value}</strong>`;
      ol.appendChild(li);
    });
  }

  async function getViewerCountry() {
    try {
      const r = await fetch(GEO_URL, { cache: "no-store" });
      if (!r.ok) return "";
      const j = await r.json();
      return (j && (j.country || j.country_code)) ? String(j.country || j.country_code).toUpperCase() : "";
    } catch {
      return "";
    }
  }

  async function loadStats(country) {
    const cfg = window.AldeaStatsConfig || {};
    const endpoint = cfg.endpoint;
    if (!endpoint) {
      const note = el("sp-note");
      if (note) note.textContent = "Brak konfiguracji statystyk (AldeaStatsConfig.endpoint).";
      return;
    }
    const url = country ? `${endpoint}?country=${encodeURIComponent(country)}` : endpoint;

    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();

      el("sp-total") && (el("sp-total").textContent = String(data.users_30d ?? "—"));
      el("sp-24h") && (el("sp-24h").textContent = String(data.users_24h ?? "—"));
      el("sp-now") && (el("sp-now").textContent = String(data.active_now ?? "—"));

      setList(el("sp-countries"), (data.top_countries || []).map(x => ({ label: x.country, value: x.count })), "Brak danych");
      setList(el("sp-nearby"), (data.nearby || []).map(x => ({ label: x.place, value: x.count })), "Na razie brak zbiorczych danych");

      const note = el("sp-note");
      if (note) {
        const upd = data.updated_at ? `Aktualizacja: ${data.updated_at}` : "";
        note.textContent = data.your_country
          ? `Twój kraj: ${data.your_country}. ${upd}`.trim()
          : `Statystyki anonimowe. ${upd}`.trim();
      }
    } catch {
      const note = el("sp-note");
      if (note) note.textContent = "Statystyki chwilowo niedostępne.";
    }
  }

  async function init() {
    const country = await getViewerCountry();
    await loadStats(country);
    setInterval(() => loadStats(country), REFRESH_MS);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
