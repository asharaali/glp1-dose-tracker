# GLP-1 Dose Tracker

A lightweight web app for tracking GLP-1 receptor agonist therapy — it generates
the standard titration schedule for a chosen medication and lets you log each
real-world dose against it.

Built as a zero-dependency static site: HTML, CSS, and vanilla JavaScript, with
all data stored locally in the browser (`localStorage`). No backend, no accounts,
no data leaves the device.

## Features

- **Titration schedules** for the major GLP-1 / dual-agonist products:
  - Semaglutide — Ozempic (T2D) & Wegovy (weight management)
  - Tirzepatide — Mounjaro (T2D) & Zepbound (weight management)
  - Dulaglutide — Trulicity
  - Liraglutide — Victoza (T2D) & Saxenda (weight management)
- **Dated schedule** computed from your start date, with the current step highlighted
- **Personal dose log** — record date, dose, injection site, and side-effect notes
- **Next-dose tracking** — shows when and how much your next dose is
- Fully offline; data persists between visits

## Run it locally

It's a static site, so just open `index.html` in a browser. To avoid any
file-path quirks, you can serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy (GitHub Pages)

1. Push this folder to a GitHub repo.
2. Repo **Settings → Pages → Source: `main` branch, `/root`**.
3. Your live link appears in a minute or two.

## Project structure

```
index.html   # markup / layout
styles.css   # styling
data.js      # titration schedules (the clinical data)
app.js       # scheduling logic, logging, persistence
```

## ⚠️ Disclaimer

This is an **educational project**, not medical advice. The schedules reflect
standard manufacturer-labeled dose-escalation patterns for reference only. Real
titration is individualized by a prescriber based on tolerability and clinical
goals. Always follow your own prescriber's and pharmacist's instructions.
