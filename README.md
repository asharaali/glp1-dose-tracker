# GLP-1 Dose Tracker

A lightweight web app for tracking GLP-1 receptor agonist therapy — it generates
the standard titration schedule for a chosen medication and lets you log each
real-world dose against it.

Built as a zero-dependency static site: HTML, CSS, and vanilla JavaScript, with
all data stored locally in the browser (`localStorage`). No backend, no accounts,
no data leaves the device.

## Why it's useful

- **Removes guesswork from titration** — GLP-1 doses step up on a fixed weekly/monthly ladder; the app builds the dated schedule so you always know the current step.
- **Tracks real-world adherence** — log each actual dose against the plan, including injection site rotation and side effects.
- **Side-effect context** — most GLP-1 nausea/GI issues happen around dose increases; seeing the schedule next to your notes makes the pattern obvious.
- **Private by design** — everything stays in your browser; nothing is uploaded.

## Who it's for

- **Patients on a GLP-1** — keep one clear picture of where they are in titration and when the next step-up is due.
- **Pharmacists & interns** — a quick reference for the standard labeled escalation across all the major products.
- **Caregivers** — help a family member stay on schedule and track tolerability.

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
