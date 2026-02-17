// assets/js/languages.js
(function () {
  const LANGUAGES = [
    { code: "pl", label: "Polski" },
    { code: "en", label: "English" },
    { code: "it", label: "Italiano" },
    { code: "es", label: "Español" }
  ];

  function getCurrentLang() {
    const lang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
    if (LANGUAGES.some(l => l.code === lang)) return lang;
    const m = location.pathname.match(/^\/(pl|en|it|es)\//i);
    return m ? m[1].toLowerCase() : "pl";
  }

  function buildLinkForLang(code) {
    const p = location.pathname;
    const m = p.match(/^\/(pl|en|it|es)(\/.*)$/i);
    if (m) return `/${code}${m[2]}`;
    return `/${code}/`;
  }

  function initLanguageMenu() {
    const container = document.getElementById("language-container");
    if (!container) return;

    const current = getCurrentLang();

    const wrap = document.createElement("div");
    wrap.className = "lang-select";

    const btn = document.createElement("button");
    btn.className = "lang-btn";
    btn.type = "button";
    btn.setAttribute("aria-haspopup", "listbox");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = `
      <span class="dot" style="width:8px;height:8px;box-shadow:0 0 0 5px rgba(143,214,148,.10)"></span>
      <span class="lang-current">${current.toUpperCase()}</span>
      <span style="opacity:.9;transform:translateY(-1px)">▾</span>
    `;

    const menu = document.createElement("div");
    menu.className = "lang-menu";
    menu.setAttribute("role", "listbox");

    LANGUAGES.forEach(l => {
      const a = document.createElement("a");
      a.href = buildLinkForLang(l.code);
      a.textContent = l.label;
      if (l.code === current) a.classList.add("active");
      menu.appendChild(a);
    });

    wrap.appendChild(btn);
    wrap.appendChild(menu);
    container.innerHTML = "";
    container.appendChild(wrap);

    const close = () => { wrap.classList.remove("open"); btn.setAttribute("aria-expanded","false"); };
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = wrap.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", close);
    document.addEventListener("keydown", (e) => e.key === "Escape" && close());
  }

  window.AldeaLang = { LANGUAGES, initLanguageMenu, getCurrentLang, buildLinkForLang };
})();
