# Dodawanie nowego języka (np. DE)

1) Skopiuj folder bazowy:
- skopiuj `en/` → `de/` (lub `pl/` → `de/` jeśli chcesz startować od PL)

2) W każdym pliku w `de/` ustaw `lang="de"` w tagu `<html lang="...">`

3) Dopisz język w: `assets/js/languages.js`
Dodaj wpis:
```js
{ code: "de", label: "Deutsch" }
```

4) Jeśli masz inne ścieżki (np. `/de/dokumentacja.html`) – nic więcej nie musisz robić.
Dropdown języka i menu aktualizują się automatycznie.

## Dodawanie nowych podstron
- Twórz je wewnątrz folderu języka: `de/nowa-strona.html`
- Skopiuj nagłówek/stopkę przez:
  - `<div id="site-header"></div>` i `<div id="site-footer"></div>`
  - oraz te same `<link>` i `<script>` w `<head>` co w index.html.
