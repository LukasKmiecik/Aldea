# Aldea.github.io – pełna struktura strony (GitHub Pages)

Ta paczka zawiera kompletną, statyczną stronę Aldea gotową do wrzucenia na GitHub Pages:
- 4 języki: PL / EN / IT / ES
- wspólne komponenty: `/components/header.html` i `/components/footer.html`
- dropdown języków generowany automatycznie z jednej listy (`assets/js/languages.js`)
- strona dokumentacji z lewym spisem treści (`/pl/dokumentacja.html` itd.)
- licznik „nie jesteś sam” (GA4 → Google Sheets → JSON Web App → strona)

---

## 1) Jak uruchomić na GitHub Pages
1. Skopiuj zawartość tego repo do Twojego repo: `Aldea.github.io`
2. GitHub → Settings → Pages → Source: `main` / root
3. Wejdź na: `https://<TwojUser>.github.io/`

Root `index.html` przekierowuje na `/pl/`.

---

## 2) Komponenty (header/footer)
Zmieniasz menu i stopkę tylko tutaj:
- `components/header.html`
- `components/footer.html`

Każda strona ładuje je przez:
- `assets/js/layout.js`

---

## 3) Statystyki (social proof) – wymagane Apps Script
### Co widzą ludzie na stronie:
- Łącznie (30 dni)
- Ostatnie 24h
- Aktywni teraz
- Top kraje
- Blisko Ciebie (z Twojego kraju) – tylko gdy jest >=3 użytkowników w 30 dni

### Co musisz zrobić:
1) W Google Sheet → Extensions → Apps Script:
- wklej `gas/Code.gs`
- włącz service: Google Analytics Data API (AnalyticsData)
- ustaw `GA4_PROPERTY_ID`
- uruchom `setup()`

2) Deploy → Web App:
- Execute as: Me
- Access: Anyone
Skopiuj URL `/exec`

3) W każdej stronie (już jest przygotowane) w `<head>` ustaw:
```js
window.AldeaStatsConfig = { endpoint: "PASTE_YOUR_WEB_APP_URL_HERE" };
```

---

## 4) Gdzie wkleić pełną dokumentację (PL)
Wejdź w:
- `pl/dokumentacja.html`

i wklej treść z Notion w odpowiednich sekcjach (podstawione są placeholdery).

---

## 5) Dodawanie kolejnych języków
Zobacz: `TRANSLATIONS.md`
