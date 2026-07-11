# valerioqunaj.com — Personal Website

Statische Single-Page-Site. Kein Build-Step, keine Dependencies.

## Struktur

- `index.html` — komplette Seite (Hero, Stats, LOCK-IN, Story, Connect)
- `css/style.css` — Design-System (Darkmode, Glassmorphism), Layout, Animationen
- `js/main.js` — EN/DE-Sprachumschaltung (oben rechts, in `localStorage` gespeichert), Scroll-Reveals
- `assets/pb_valerio_cutout.png` — freigestelltes Portrait (aus `pb_valerio.png` generiert)

## Lokal starten

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Deployen

Ordner direkt zu Vercel, Netlify oder GitHub Pages hochladen — es ist reines statisches HTML.

## Texte ändern

Alle übersetzbaren Texte liegen im `translations`-Objekt in `js/main.js` (EN + DE). Der LOCK-IN-Link ist `https://get-lockin.app/` (2× in `index.html`).
