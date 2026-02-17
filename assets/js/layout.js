// assets/js/layout.js
async function loadComponent(targetId, url) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) {
    console.warn("Component load failed:", url, res.status);
    return;
  }
  target.innerHTML = await res.text();
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("site-header", "/components/header.html");
  await loadComponent("site-footer", "/components/footer.html");

  window.AldeaLang?.initLanguageMenu?.();
  window.AldeaNavInit?.();
});
