// ---- State ----
// Plan + log are persisted in localStorage so it survives refreshes.
const STORAGE_KEY = "glp1-tracker-v1";

let state = {
  productId: null,
  startDate: null, // ISO "YYYY-MM-DD"
  log: [],         // [{ id, date, dose, site, notes }]
};

// ---- Helpers ----
const $ = (sel) => document.querySelector(sel);
const productById = (id) => PRODUCTS.find((p) => p.id === id);

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function addDays(iso, days) {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function fmtDate(iso) {
  if (!iso) return "—";
  return new Date(iso + "T00:00:00").toLocaleDateString(undefined, {
    month: "short", day: "numeric", year: "numeric",
  });
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try { state = JSON.parse(raw); } catch { /* ignore corrupt data */ }
  }
}

// ---- Core: build the dated schedule ----
// Walks the product's steps from the start date, assigning each step a
// start date. Weekly drugs advance N*7 days per step; daily drugs N days.
function buildSchedule(product, startDate) {
  const perStepDays = product.frequency === "weekly" ? 7 : 1;
  const rows = [];
  let cursor = startDate;
  product.steps.forEach((step, i) => {
    rows.push({ ...step, index: i, startsOn: cursor });
    if (step.weeks !== null) {
      cursor = addDays(cursor, step.weeks * perStepDays);
    }
  });
  return rows; // each row knows when it starts
}

// Which step are we on today?
function currentStepIndex(schedule, refISO) {
  let idx = 0;
  for (let i = 0; i < schedule.length; i++) {
    if (refISO >= schedule[i].startsOn) idx = i;
  }
  return idx;
}

// Next dose date = last logged dose + dosing interval, or the start date
// if nothing logged yet.
function nextDoseDate(product) {
  const intervalDays = product.frequency === "weekly" ? 7 : 1;
  if (state.log.length === 0) return state.startDate;
  const last = [...state.log].sort((a, b) => a.date.localeCompare(b.date)).pop();
  return addDays(last.date, intervalDays);
}

// ---- Rendering ----
function renderProductOptions() {
  const sel = $("#product");
  sel.innerHTML = PRODUCTS.map(
    (p) => `<option value="${p.id}">${p.brand} (${p.generic}) — ${p.indication}</option>`
  ).join("");
}

function renderAll() {
  const product = productById(state.productId);
  if (!product || !state.startDate) return;

  const schedule = buildSchedule(product, state.startDate);
  const refISO = nextDoseDate(product); // dose-amount target = where you're headed next
  const curIdx = currentStepIndex(schedule, refISO);

  // Status panel
  $("#status").classList.remove("hidden");
  const curStep = schedule[curIdx];
  $("#currentDose").textContent = `${curStep.dose} ${curStep.unit}`;
  $("#nextDoseDate").textContent = fmtDate(nextDoseDate(product));
  $("#nextDoseAmount").textContent = `${curStep.dose} ${curStep.unit}`;

  // Schedule table
  $("#scheduleCard").classList.remove("hidden");
  const tbody = $("#scheduleTable tbody");
  tbody.innerHTML = schedule
    .map(
      (s) => `
      <tr class="${s.index === curIdx ? "current-step" : ""}">
        <td>${s.index + 1}</td>
        <td>${s.dose} ${s.unit}</td>
        <td>${fmtDate(s.startsOn)}</td>
        <td>${s.note || ""}</td>
      </tr>`
    )
    .join("");

  renderLog();
}

function renderLog() {
  $("#logCard").classList.remove("hidden");
  const list = $("#logList");
  const sorted = [...state.log].sort((a, b) => b.date.localeCompare(a.date));
  $("#emptyLog").classList.toggle("hidden", sorted.length > 0);
  list.innerHTML = sorted
    .map(
      (entry) => `
      <li>
        <div>
          <div class="log-main">${entry.dose} mg &middot; ${fmtDate(entry.date)}</div>
          <div class="log-meta">${[entry.site, entry.notes].filter(Boolean).join(" · ") || "—"}</div>
        </div>
        <button class="log-del" data-id="${entry.id}" title="Delete">&times;</button>
      </li>`
    )
    .join("");

  list.querySelectorAll(".log-del").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.log = state.log.filter((e) => e.id !== btn.dataset.id);
      save();
      renderAll();
    });
  });
}

// ---- Modal ----
function openModal() {
  const product = productById(state.productId);
  const schedule = buildSchedule(product, state.startDate);
  const curIdx = currentStepIndex(schedule, nextDoseDate(product));
  $("#logDate").value = nextDoseDate(product) || todayISO();
  $("#logDose").value = schedule[curIdx].dose; // pre-fill with expected dose
  $("#logSite").value = "";
  $("#logNotes").value = "";
  $("#modal").classList.remove("hidden");
}
function closeModal() { $("#modal").classList.add("hidden"); }

// ---- Events ----
function init() {
  load();
  renderProductOptions();

  // Restore prior plan if present
  if (state.productId) $("#product").value = state.productId;
  if (state.startDate) $("#startDate").value = state.startDate;
  else $("#startDate").value = todayISO();
  if (state.productId && state.startDate) renderAll();

  $("#buildPlan").addEventListener("click", () => {
    const productId = $("#product").value;
    const startDate = $("#startDate").value;
    if (!startDate) { alert("Pick a start date first."); return; }
    // Changing the medication resets the log to avoid mixing drugs.
    if (state.productId && state.productId !== productId) state.log = [];
    state.productId = productId;
    state.startDate = startDate;
    save();
    renderAll();
  });

  $("#logToday").addEventListener("click", openModal);
  $("#cancelLog").addEventListener("click", closeModal);
  $("#saveLog").addEventListener("click", () => {
    const dose = parseFloat($("#logDose").value);
    const date = $("#logDate").value;
    if (!date || isNaN(dose)) { alert("Enter a date and dose."); return; }
    state.log.push({
      id: crypto.randomUUID(),
      date,
      dose,
      site: $("#logSite").value.trim(),
      notes: $("#logNotes").value.trim(),
    });
    save();
    closeModal();
    renderAll();
  });

  // Close modal when clicking the backdrop
  $("#modal").addEventListener("click", (e) => {
    if (e.target.id === "modal") closeModal();
  });
}

document.addEventListener("DOMContentLoaded", init);
