/**
 * Aldea – GA4 → Sheets → Public JSON (Web App)
 *
 * Wymaga włączenia Advanced Service:
 *  - Google Analytics Data API (AnalyticsData)
 *
 * 1) Ustaw GA4_PROPERTY_ID
 * 2) Uruchom setup()
 * 3) Deploy jako Web App (Execute as Me, Access Anyone)
 */

const GA4_PROPERTY_ID = "PUT_YOUR_GA4_PROPERTY_ID_HERE"; // np. "123456789" (bez "properties/")
const SHEET_CONFIG = "CONFIG";
const SHEET_CACHE  = "CACHE";
const SHEET_HISTORY= "HISTORY";

// Jak często odświeżać cache (minuty)
const REFRESH_MINUTES = 15;

// Minimalna liczba użytkowników, żeby pokazać region/miasto w "Blisko Ciebie"
const MIN_NEARBY_THRESHOLD = 3;

// Zewnętrzny serwis do wykrywania kraju po stronie przeglądarki jest w JS.
// Backend przyjmuje opcjonalny parametr: ?country=NO

function setup() {
  const ss = SpreadsheetApp.getActive();
  ensureSheet_(ss, SHEET_CONFIG);
  ensureSheet_(ss, SHEET_CACHE);
  ensureSheet_(ss, SHEET_HISTORY);

  // zapis konfiguracji
  const cfg = ss.getSheetByName(SHEET_CONFIG);
  cfg.clear();
  cfg.getRange(1,1,6,2).setValues([
    ["KEY","VALUE"],
    ["GA4_PROPERTY_ID", GA4_PROPERTY_ID],
    ["REFRESH_MINUTES", String(REFRESH_MINUTES)],
    ["MIN_NEARBY_THRESHOLD", String(MIN_NEARBY_THRESHOLD)],
    ["LAST_REFRESH_ISO", ""],
    ["WEBAPP_HINT", "Deploy -> Web App -> Execute as Me -> Anyone"]
  ]);
  cfg.autoResizeColumns(1,2);

  // ustaw trigger
  clearTriggers_();
  ScriptApp.newTrigger("refreshCache")
    .timeBased()
    .everyMinutes(REFRESH_MINUTES)
    .create();

  // pierwszy refresh
  refreshCache();
}

function refreshCache() {
  const ss = SpreadsheetApp.getActive();
  const cacheSheet = ss.getSheetByName(SHEET_CACHE);
  const histSheet  = ss.getSheetByName(SHEET_HISTORY);
  if (!cacheSheet || !histSheet) throw new Error("Brak arkuszy CACHE/HISTORY. Uruchom setup().");

  const now = new Date();
  const iso = now.toISOString();

  const stats = buildStats_();

  // CACHE: trzymamy JSON + timestamp
  cacheSheet.clear();
  cacheSheet.getRange(1,1,2,1).setValues([
    [iso],
    [JSON.stringify(stats)]
  ]);
  cacheSheet.autoResizeColumns(1,1);

  // HISTORY: dopisuj wiersz (timestamp + total_30d + users_24h + active_now)
  if (histSheet.getLastRow() === 0) {
    histSheet.getRange(1,1,1,4).setValues([["timestamp","users_30d","users_24h","active_now"]]);
  }
  histSheet.appendRow([iso, stats.users_30d, stats.users_24h, stats.active_now]);

  // update CONFIG timestamp
  const cfg = ss.getSheetByName(SHEET_CONFIG);
  if (cfg) cfg.getRange("B5").setValue(iso);

  return stats;
}

function doGet(e) {
  // Zwraca JSON do strony.
  // Możesz podać ?country=NO żeby dostać "nearby" z tego kraju
  const ss = SpreadsheetApp.getActive();
  const cacheSheet = ss.getSheetByName(SHEET_CACHE);
  if (!cacheSheet || cacheSheet.getLastRow() < 2) {
    // fallback: spróbuj odświeżyć
    const stats = refreshCache();
    return json_(stats);
  }

  const iso = String(cacheSheet.getRange(1,1).getValue() || "");
  const raw = String(cacheSheet.getRange(2,1).getValue() || "{}");
  let stats = {};
  try { stats = JSON.parse(raw); } catch { stats = {}; }
  stats.updated_at = iso || new Date().toISOString();

  const country = (e && e.parameter && e.parameter.country) ? String(e.parameter.country).toUpperCase() : "";
  if (country && stats.breakdown && stats.breakdown.byCountryRegion) {
    stats.nearby = buildNearby_(stats.breakdown.byCountryRegion, country);
    stats.your_country = country;
  } else {
    stats.nearby = [];
    stats.your_country = country || "";
  }

  // usuń ciężkie breakdowny z odpowiedzi publicznej (opcjonalnie)
  // zostawiamy tylko to co potrzebne
  delete stats.breakdown;

  return json_(stats);
}

function doPost(e) {
  // (opcjonalnie) endpoint do pingów itp. – na razie nie używamy.
  return json_({ ok: true });
}

/** -------------------- GA4 FETCH -------------------- **/

function buildStats_() {
  if (!GA4_PROPERTY_ID || GA4_PROPERTY_ID.includes("PUT_YOUR")) {
    throw new Error("Ustaw GA4_PROPERTY_ID w Code.gs (Property ID z GA4).");
  }

  const property = "properties/" + GA4_PROPERTY_ID;

  // 1) aktywni teraz (Realtime)
  const active_now = getRealtimeActiveUsers_(property);

  // 2) użytkownicy 24h
  const users_24h = getUsersLastHours_(property, 24);

  // 3) użytkownicy 30d
  const users_30d = getUsersLastDays_(property, 30);

  // 4) top kraje 30d
  const topCountries = getTopCountriesLastDays_(property, 30, 8);

  // 5) breakdown: kraj + region + miasto (30d) do "nearby"
  const byCountryRegion = getCountryRegionCityLastDays_(property, 30);

  return {
    active_now,
    users_24h,
    users_30d,
    top_countries: topCountries,
    nearby: [],
    your_country: "",
    updated_at: new Date().toISOString(),
    breakdown: {
      byCountryRegion
    }
  };
}

function getRealtimeActiveUsers_(property) {
  // Realtime: metric activeUsers, no date range
  // https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runRealtimeReport
  const req = {
    metrics: [{ name: "activeUsers" }]
  };
  const resp = AnalyticsData.Properties.runRealtimeReport(req, property);
  const rows = (resp && resp.rows) ? resp.rows : [];
  if (!rows.length) return 0;
  const v = rows[0].metricValues && rows[0].metricValues[0] ? rows[0].metricValues[0].value : "0";
  return Number(v || 0);
}

function getUsersLastHours_(property, hours) {
  // GA4 Data API nie ma "last X hours" bezpośrednio w dateRanges.
  // Robimy kompromis: last 1 day (yesterday+today) w strefie property.
  // W praktyce dla social-proof wystarczy.
  const req = {
    dateRanges: [{ startDate: "yesterday", endDate: "today" }],
    metrics: [{ name: "activeUsers" }]
  };
  const resp = AnalyticsData.Properties.runReport(req, property);
  return extractSingleMetric_(resp);
}

function getUsersLastDays_(property, days) {
  const req = {
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
    metrics: [{ name: "activeUsers" }]
  };
  const resp = AnalyticsData.Properties.runReport(req, property);
  return extractSingleMetric_(resp);
}

function getTopCountriesLastDays_(property, days, limit) {
  const req = {
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
    dimensions: [{ name: "country" }],
    metrics: [{ name: "activeUsers" }],
    orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
    limit: limit
  };
  const resp = AnalyticsData.Properties.runReport(req, property);
  const rows = (resp && resp.rows) ? resp.rows : [];
  return rows.map(r => ({
    country: (r.dimensionValues && r.dimensionValues[0]) ? r.dimensionValues[0].value : "",
    count: Number((r.metricValues && r.metricValues[0]) ? r.metricValues[0].value : 0)
  })).filter(x => x.country);
}

function getCountryRegionCityLastDays_(property, days) {
  // Zwraca listę rekordów: {country, region, city, count}
  // Uwaga: limitujemy do sensownej liczby wierszy.
  const req = {
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
    dimensions: [{ name: "countryId" }, { name: "region" }, { name: "city" }],
    metrics: [{ name: "activeUsers" }],
    orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
    limit: 1000
  };
  const resp = AnalyticsData.Properties.runReport(req, property);
  const rows = (resp && resp.rows) ? resp.rows : [];
  return rows.map(r => ({
    country: (r.dimensionValues && r.dimensionValues[0]) ? String(r.dimensionValues[0].value || "").toUpperCase() : "",
    region:  (r.dimensionValues && r.dimensionValues[1]) ? String(r.dimensionValues[1].value || "") : "",
    city:    (r.dimensionValues && r.dimensionValues[2]) ? String(r.dimensionValues[2].value || "") : "",
    count: Number((r.metricValues && r.metricValues[0]) ? r.metricValues[0].value : 0)
  })).filter(x => x.country);
}

/** -------------------- HELPERS -------------------- **/

function extractSingleMetric_(resp) {
  const rows = (resp && resp.rows) ? resp.rows : [];
  if (!rows.length) return 0;
  const v = rows[0].metricValues && rows[0].metricValues[0] ? rows[0].metricValues[0].value : "0";
  return Number(v || 0);
}

function buildNearby_(byCountryRegion, country) {
  // grupowanie po city/region i filtr threshold
  const map = {};
  byCountryRegion.forEach(r => {
    if (r.country !== country) return;
    const place = (r.city && r.city.trim()) ? r.city : (r.region && r.region.trim() ? r.region : "");
    if (!place) return;
    map[place] = (map[place] || 0) + Number(r.count || 0);
  });

  const items = Object.keys(map).map(k => ({ place: k, count: map[k] }))
    .filter(x => x.count >= MIN_NEARBY_THRESHOLD)
    .sort((a,b) => b.count - a.count)
    .slice(0, 8);

  return items;
}

function ensureSheet_(ss, name) {
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  return sh;
}

function clearTriggers_() {
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
