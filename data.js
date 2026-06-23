// GLP-1 titration schedules.
// Each product = a brand+indication with an ordered list of dose steps.
// step.weeks = how many weeks you stay on that dose before stepping up.
// The last step is the maintenance/target dose (weeks: null = stay here).
//
// NOTE: These are standard manufacturer-labeled escalation schedules for
// reference only. Real-world titration is individualized by the prescriber
// (tolerability, A1c/weight goals, side effects). See the disclaimer in the app.

const PRODUCTS = [
  {
    id: "ozempic",
    generic: "Semaglutide",
    brand: "Ozempic",
    indication: "Type 2 diabetes",
    frequency: "weekly",
    route: "Subcutaneous injection",
    steps: [
      { dose: 0.25, unit: "mg", weeks: 4, note: "Starting dose — not for glycemic control, GI tolerance only" },
      { dose: 0.5, unit: "mg", weeks: 4, note: "First therapeutic dose" },
      { dose: 1.0, unit: "mg", weeks: 4, note: "Increase if more control needed" },
      { dose: 2.0, unit: "mg", weeks: null, note: "Maximum dose" },
    ],
  },
  {
    id: "wegovy",
    generic: "Semaglutide",
    brand: "Wegovy",
    indication: "Chronic weight management",
    frequency: "weekly",
    route: "Subcutaneous injection",
    steps: [
      { dose: 0.25, unit: "mg", weeks: 4, note: "Starting dose" },
      { dose: 0.5, unit: "mg", weeks: 4, note: "" },
      { dose: 1.0, unit: "mg", weeks: 4, note: "" },
      { dose: 1.7, unit: "mg", weeks: 4, note: "" },
      { dose: 2.4, unit: "mg", weeks: null, note: "Maintenance / target dose" },
    ],
  },
  {
    id: "mounjaro",
    generic: "Tirzepatide",
    brand: "Mounjaro",
    indication: "Type 2 diabetes",
    frequency: "weekly",
    route: "Subcutaneous injection",
    steps: [
      { dose: 2.5, unit: "mg", weeks: 4, note: "Starting dose — initiation only" },
      { dose: 5.0, unit: "mg", weeks: 4, note: "First maintenance dose" },
      { dose: 7.5, unit: "mg", weeks: 4, note: "Increase in 2.5 mg steps as needed" },
      { dose: 10.0, unit: "mg", weeks: 4, note: "" },
      { dose: 12.5, unit: "mg", weeks: 4, note: "" },
      { dose: 15.0, unit: "mg", weeks: null, note: "Maximum dose" },
    ],
  },
  {
    id: "zepbound",
    generic: "Tirzepatide",
    brand: "Zepbound",
    indication: "Chronic weight management",
    frequency: "weekly",
    route: "Subcutaneous injection",
    steps: [
      { dose: 2.5, unit: "mg", weeks: 4, note: "Starting dose" },
      { dose: 5.0, unit: "mg", weeks: 4, note: "" },
      { dose: 7.5, unit: "mg", weeks: 4, note: "" },
      { dose: 10.0, unit: "mg", weeks: 4, note: "" },
      { dose: 12.5, unit: "mg", weeks: 4, note: "" },
      { dose: 15.0, unit: "mg", weeks: null, note: "Maximum dose" },
    ],
  },
  {
    id: "trulicity",
    generic: "Dulaglutide",
    brand: "Trulicity",
    indication: "Type 2 diabetes",
    frequency: "weekly",
    route: "Subcutaneous injection",
    steps: [
      { dose: 0.75, unit: "mg", weeks: 4, note: "Starting dose" },
      { dose: 1.5, unit: "mg", weeks: 4, note: "Increase for additional control" },
      { dose: 3.0, unit: "mg", weeks: 4, note: "" },
      { dose: 4.5, unit: "mg", weeks: null, note: "Maximum dose" },
    ],
  },
  {
    id: "victoza",
    generic: "Liraglutide",
    brand: "Victoza",
    indication: "Type 2 diabetes",
    frequency: "daily",
    route: "Subcutaneous injection",
    steps: [
      { dose: 0.6, unit: "mg", weeks: 1, note: "Starting dose — to reduce GI symptoms" },
      { dose: 1.2, unit: "mg", weeks: null, note: "Can increase to 1.8 mg if needed" },
    ],
  },
  {
    id: "saxenda",
    generic: "Liraglutide",
    brand: "Saxenda",
    indication: "Chronic weight management",
    frequency: "daily",
    route: "Subcutaneous injection",
    steps: [
      { dose: 0.6, unit: "mg", weeks: 1, note: "Week 1" },
      { dose: 1.2, unit: "mg", weeks: 1, note: "Week 2" },
      { dose: 1.8, unit: "mg", weeks: 1, note: "Week 3" },
      { dose: 2.4, unit: "mg", weeks: 1, note: "Week 4" },
      { dose: 3.0, unit: "mg", weeks: null, note: "Maintenance / target dose" },
    ],
  },
];
