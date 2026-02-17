// assets/js/nav.js
(function () {
  function init() {
    const current = window.AldeaLang?.getCurrentLang?.() ?? "pl";

    const home = document.querySelector('[data-nav="home"]');
    const manifest = document.querySelector('[data-nav="manifest"]');
    const plan = document.querySelector('[data-nav="plan"]');
    const docs = document.querySelector('[data-nav="docs"]');

    if (home) home.href = `/${current}/`;
    if (manifest) manifest.href = `/${current}/index.html#manifest`;
    if (plan) plan.href = `/${current}/index.html#plan`;
    if (docs) docs.href = `/${current}/dokumentacja.html`;

    const toggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    if (toggle && navLinks) toggle.addEventListener("click", () => navLinks.classList.toggle("open"));

    // active link highlight
    const p = location.pathname.toLowerCase();
    document.querySelectorAll(".nav-links a").forEach(a => a.classList.remove("nav-active"));
    if (p.endsWith("dokumentacja.html")) docs?.classList.add("nav-active");
    else home?.classList.add("nav-active");
  }

  window.AldeaNavInit = init;
})();
