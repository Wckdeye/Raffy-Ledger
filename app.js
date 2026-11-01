/* Raffy's Ledger — offline personal finance app. All data lives in this phone's browser storage. */
(() => {
"use strict";

/* ================= icons ================= */
const P = {
  cart:'<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3.5h2.6l2.2 11.2a1.6 1.6 0 0 0 1.6 1.3h8.6a1.6 1.6 0 0 0 1.6-1.2L21 7.5H6"/>',
  baby:'<circle cx="12" cy="12" r="8"/><path d="M9.3 11h.01M14.7 11h.01M9.6 14.6a3.3 3.3 0 0 0 4.8 0M12 4c-1 1.3-.7 2.6.7 3.1"/>',
  fuel:'<path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M3 21h12M4 10h10M14 8l3.5 3.5V17a1.5 1.5 0 0 0 3 0V9l-3-3"/>',
  bolt:'<path d="M13 2.5 4.5 13.5H12l-1 8 8.5-11H12z"/>',
  food:'<path d="M5 3v7a2.5 2.5 0 0 0 5 0V3M7.5 3v18M17 21V3c-2.2 1-3.5 3.6-3.5 7.5 0 1.4.7 2.5 1.8 2.5H17"/>',
  home:'<path d="M3.5 11 12 4l8.5 7M5.5 9.5V20h13V9.5M10 20v-5.5h4V20"/>',
  bag:'<path d="M5 8h14l-1 12.5H6zM9 8V6.5a3 3 0 0 1 6 0V8"/>',
  health:'<path d="M20.5 9.5c0 5.5-8.5 10.5-8.5 10.5S3.5 15 3.5 9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8.5 2.5z"/><path d="M7 12h2.5l1.5-2.5 2 5 1.5-2.5H17"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5"/>',
  repeat:'<path d="M17 2.5 20.5 6 17 9.5M3.5 11.5V10a4 4 0 0 1 4-4h13M7 21.5 3.5 18 7 14.5M20.5 12.5V14a4 4 0 0 1-4 4h-13"/>',
  gift:'<rect x="3.5" y="8" width="17" height="4" rx="1"/><path d="M5 12v8.5h14V12M12 8v12.5M12 8S10.5 3.5 8 4.2C6 4.8 7 8 12 8zm0 0s1.5-4.5 4-3.8C18 4.8 17 8 12 8z"/>',
  percent:'<path d="M19 5 5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>',
  dots:'<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>',
  bank:'<path d="M3 20.5h18M4.5 9.5h15M12 3l8 4.5H4zM6.5 9.5v8M10 9.5v8M14 9.5v8M17.5 9.5v8"/>',
  briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v2M3 12.5h18"/>',
  wifi:'<path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r=".9"/>',
  router:'<rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 16.5h.01M10.5 16.5h.01M15 13V8M9.5 8.5a7 7 0 0 1 11 0M12 6a3.5 3.5 0 0 1 6 0"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  pluscircle:'<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
  key:'<circle cx="8" cy="15" r="4.5"/><path d="m11.2 11.8 8.3-8.3M16.5 6.5l2.5 2.5M14 9l2 2"/>',
  cash:'<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9.5v.01M18 14.5v.01"/>',
  phone:'<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  trend:'<path d="m3 17 6-6 4 4 8-8M15 7h6v6"/>',
  card:'<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6.5 15h4"/>',
  later:'<path d="M5 8h14l-.5 5M9 8V6.5a3 3 0 0 1 6 0V8M6 8l-1 12.5h6"/><circle cx="17.5" cy="17.5" r="4"/><path d="M17.5 15.6v2l1.3 1"/>',
  loan:'<path d="M6.5 3h8l4 4v14h-12z"/><path d="M14.5 3v4h4M9.5 17l5-6"/><circle cx="10" cy="11.5" r="1"/><circle cx="14" cy="16.5" r="1"/>',
  out:'<path d="M7 17 17 7M8 7h9v9"/>',
  in:'<path d="M17 7 7 17M16 17H7V8"/>',
  swap:'<path d="M4 8h15M15 4l4 4-4 4M20 16H5M9 12l-4 4 4 4"/>',
  coins:'<ellipse cx="9" cy="6.5" rx="5.5" ry="2.5"/><path d="M3.5 6.5v4c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4M3.5 10.5v4c0 1.4 2.5 2.5 5.5 2.5 1 0 1.9-.1 2.7-.3"/><circle cx="16.5" cy="16" r="4.5"/><path d="M16.5 14v4"/>',
  bill:'<path d="M6 2.5h12v19l-3-2-3 2-3-2-3 2z"/><path d="M9 7.5h6M9 11.5h6M9 15.5h3.5"/>',
  tag:'<path d="M3 12V4.5A1.5 1.5 0 0 1 4.5 3H12l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.3"/>',
  edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
  down:'<path d="M12 3.5v12M7 10.5l5 5 5-5M4 20.5h16"/>',
  up:'<path d="M12 15.5v-12M7 8.5l5-5 5 5M4 20.5h16"/>',
  table:'<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M3.5 9.5h17M3.5 15h17M9.5 3.5v17"/>',
  sliders:'<path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
  grid:'<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>',
  list:'<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
  wallet:'<path d="M4 7.5V18a2 2 0 0 0 2 2h14V9.5H6A2 2 0 0 1 4 7.5zm0 0A2.5 2.5 0 0 1 6.5 5H17"/><path d="M16 14.5h.01"/>',
  pulse:'<path d="M3 12h4l2.5-6 5 12 2.5-6h4"/>',
  check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  x:'<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
  install:'<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M12 7v7M9 11l3 3 3-3"/>',
  wrench:'<path d="M14.7 3.6a5 5 0 0 0-5.4 6.6L3.5 16v4.5H8l5.8-5.8a5 5 0 0 0 6.6-5.4l-3.2 3.2-3.3-.9-.9-3.3z"/>',
  box:'<path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5z"/><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9"/>',
  chart:'<path d="M4 20h16"/><rect x="5.5" y="11" width="3" height="7" rx="1"/><rect x="10.5" y="6" width="3" height="12" rx="1"/><rect x="15.5" y="13" width="3" height="5" rx="1"/>',
  target:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
  recur:'<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4M9 15.3a3 3 0 0 0 5.4 1.2M15 14.5a3 3 0 0 0-5.4-1.2"/>',
  layers:'<path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8z"/><path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5"/>',
  lock:'<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3M12 14.5v2"/>',
  search:'<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  back:'<path d="M15 5l-7 7 7 7"/>',
  chev:'<path d="m9 5 7 7-7 7"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h10"/>',
  gauge:'<path d="M4.5 17.5a8.5 8.5 0 1 1 15 0"/><path d="m12 13.5 3.5-4"/><circle cx="12" cy="14" r="1.3"/>',
  shield:'<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
  calendar:'<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  piggy:'<path d="M19 11.5c0-3.6-3.1-6-7-6-1.7 0-3.3.4-4.5 1.2L5 5.5v3.2A6 6 0 0 0 4 11H2.5v3H4a6.4 6.4 0 0 0 3 3.6V20h3v-1.7h4V20h3v-2.4c1.3-1 2-2.4 2-4.1z"/><path d="M15.5 10.5h.01"/>',
};
const ico = (n, cls) => `<svg class="ic${cls ? " " + cls : ""}" viewBox="0 0 24 24" aria-hidden="true">${P[n] || P.tag}</svg>`;
const CAT_ICON = {"Groceries":"cart","Baby":"baby","Fuel & transport":"fuel","Utilities & load":"bolt","Food & dining":"food","Household":"home","Shopping":"bag","Health":"health","Personal":"user","Subscriptions":"repeat","Family & gifts":"gift","Interest & fees":"percent","Other":"dots",
  "Repairs & maintenance":"wrench","Property tax (amilyar)":"bill","Internet upstream":"router","Equipment & supplies":"box",
  "Gov't salary":"bank","Private work":"briefcase","Internet business":"wifi","Parents' allowance":"users","Other income":"pluscircle","Rental":"key"};
const KW = [[/grocer|market|palengke/i,"cart"],[/baby|kid|child|diaper|milk|school|tuition/i,"baby"],[/fuel|gas|transpo|grab|fare|car|moto|nmax|parts/i,"fuel"],[/electric|water|util|load|meralco/i,"bolt"],[/food|dine|eat|resto|coffee|snack/i,"food"],[/repair|maint|fix/i,"wrench"],[/house|home/i,"home"],[/shop|shopee|lazada/i,"bag"],[/health|med|doctor|pharm|hospital/i,"health"],[/sub|netflix|spotify|app/i,"repeat"],[/gift|family|church|zakat|donat/i,"gift"],[/interest|fee|charge/i,"percent"],[/tax|amilyar|bir|permit/i,"bill"],[/equip|supply|supplies|tool/i,"box"],[/upstream|isp|bandwidth/i,"router"],[/salary|gov|payroll/i,"bank"],[/work|freelance|job|consult/i,"briefcase"],[/internet|wifi/i,"wifi"],[/allowance|parent/i,"users"],[/rent/i,"key"],[/pickle|sport|gym/i,"pulse"],[/save|saving|invest/i,"trend"]];
const catIcon = c => (S && S.data && S.data.catIcons && S.data.catIcons[c]) || CAT_ICON[c] || (KW.find(([r]) => r.test(c || "")) || [0, "tag"])[1];

/* ================= helpers ================= */
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const pad = n => String(n).padStart(2, "0");
const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const fmt = c => "₱" + (Math.abs(c) / 100).toLocaleString("en-PH", {minimumFractionDigits: 2, maximumFractionDigits: 2});
const sfmt = c => (c < 0 ? "−" : "") + fmt(c);
const pesoShort = c => { const n = Math.abs(c) / 100; const s = n >= 1e6 ? (n / 1e6).toFixed(2) + "M" : n.toLocaleString("en-PH", {maximumFractionDigits: 0}); return (c < 0 ? "−" : "") + "₱" + s; };
const kShort = c => { const n = Math.abs(c) / 100; return (c < 0 ? "−" : "") + (n >= 1e6 ? (n / 1e6).toFixed(1) + "M" : n >= 1e3 ? Math.round(n / 1e3) + "k" : Math.round(n)); };
const parseAmt = s => { const n = Number(String(s ?? "").replace(/[₱,\s]/g, "")); return isFinite(n) && n > 0 ? Math.round(n * 100) : null; };
const isZeroish = s => Number(String(s).replace(/[₱,\s]/g, "")) === 0;
const toISO = d => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
const today = () => toISO(new Date());
const parseISO = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const daysUntil = iso => Math.round((parseISO(iso) - parseISO(today())) / 864e5);
const addDays = (iso, n) => { const d = parseISO(iso); d.setDate(d.getDate() + n); return toISO(d); };
const mKey = iso => iso.slice(0, 7);
const mShift = (mk, n) => { const [y, m] = mk.split("-").map(Number); return toISO(new Date(y, m - 1 + n, 1)).slice(0, 7); };
const mDiff = (a, b) => { const [ay, am] = a.split("-").map(Number), [by, bm] = b.split("-").map(Number); return (by - ay) * 12 + (bm - am); };
const lastDay = mk => { const [y, m] = mk.split("-").map(Number); return new Date(y, m, 0).getDate(); };
const mLabel = (mk, long) => { const [y, m] = mk.split("-").map(Number); return new Date(y, m - 1, 1).toLocaleString("en-PH", {month: long ? "long" : "short", year: "numeric"}); };
const mName = mk => { const [y, m] = mk.split("-").map(Number); return new Date(y, m - 1, 1).toLocaleString("en-PH", {month: "long"}); };
const mAbbr = mk => { const [y, m] = mk.split("-").map(Number); return new Date(y, m - 1, 1).toLocaleString("en-PH", {month: "short"}); };
const dLabel = iso => parseISO(iso).toLocaleDateString("en-PH", {weekday: "short", month: "short", day: "numeric"});
const dShort = iso => parseISO(iso).toLocaleDateString("en-PH", {month: "short", day: "numeric"});
const clone = o => JSON.parse(JSON.stringify(o));
const pref = { get(k, d) { try { const v = localStorage.getItem("ledger-pref:" + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
               set(k, v) { try { localStorage.setItem("ledger-pref:" + k, JSON.stringify(v)); } catch {} } };
const ordinal = n => n + (n % 10 === 1 && n !== 11 ? "st" : n % 10 === 2 && n !== 12 ? "nd" : n % 10 === 3 && n !== 13 ? "rd" : "th");
const WD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* ================= model ================= */
const GROUPS = {
  cash: {label: "Cash", kind: "asset", icon: "cash"}, bank: {label: "Bank", kind: "asset", icon: "bank"}, ewallet: {label: "E-wallet", kind: "asset", icon: "phone"},
  invest: {label: "Savings / invest", kind: "asset", icon: "trend"}, card: {label: "Credit card", kind: "liability", icon: "card"}, bnpl: {label: "Pay later", kind: "liability", icon: "later"},
  loan: {label: "Loan I owe", kind: "liability", icon: "loan"},
};
const KINDS = {
  rent: {label: "Rent", income: "Rental", biz: "rental", charge: "Bill rent", monthly: true, icon: "key"},
  internet: {label: "Internet", income: "Internet business", biz: "internet", charge: "Bill", monthly: true, icon: "wifi"},
  loan: {label: "Loan", income: null, biz: null, charge: "Lend more", monthly: false, icon: "coins"},
  other: {label: "Other", income: "Other income", biz: null, charge: "Charge", monthly: false, icon: "user"},
};
const BIZ = {rental: {label: "Rental", name: "Rental property", icon: "key"}, internet: {label: "Internet", name: "Internet business", icon: "wifi"}};
const DEFAULT_ACCOUNTS = [
  ["cash", "Cash on hand", "cash"], ["bank", "Bank account", "bank"], ["gcash", "GCash", "ewallet"], ["pj", "Pickle Jar capital", "invest"],
  ["mb", "Metrobank card", "card"], ["ub", "UnionBank card", "card"], ["rcbc", "RCBC card", "card"], ["spl", "SPayLater", "bnpl"],
];
const BIZ_CATS = ["Repairs & maintenance", "Property tax (amilyar)", "Internet upstream", "Equipment & supplies"];
const DEFAULT_CATS = {
  income: ["Gov't salary", "Private work", "Internet business", "Parents' allowance", "Other income"],
  expense: ["Groceries", "Baby", "Fuel & transport", "Utilities & load", "Food & dining", "Household", "Shopping", "Health", "Personal", "Subscriptions", "Family & gifts", "Interest & fees", ...BIZ_CATS, "Other"],
};
const NAV = [["home", "Home", "grid"], ["activity", "Activity", "list"], ["owe", "I owe", "card"], ["owed", "Owed to me", "coins"], ["more", "More", "menu"]];
const SUB = {reports: "Reports", budgets: "Budgets", goals: "Savings goals", recurring: "Recurring", accounts: "Accounts", security: "Security & backup"};
const TYPES = [["expense", "Expense", "out"], ["income", "Income", "in"], ["transfer", "Transfer", "swap"], ["collect", "Got paid", "coins"]];

/* ================= storage ================= */
const KEY = "raffy-ledger-v1";
let view0 = pref.get("view", "home"); if (view0 === "cards") view0 = "owe"; if (view0 === "accounts") view0 = "more";
const S = { data: null, view: NAV.some(n => n[0] === view0) ? view0 : "home", month: mKey(today()), filter: "all", pfilter: "all", q: "", rmode: "month" };
function load() { try { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : null; } catch { return null; } }
function persist() { try { localStorage.setItem(KEY, JSON.stringify(S.data)); return true; } catch { toast("Couldn't save on this phone. Storage may be full — export a backup.", true); return false; } }
function save() { persist(); render(); }
function normalize(d) {
  d.accounts = d.accounts || {}; d.people = d.people || {}; d.txns = d.txns || {};
  d.cats = d.cats || clone(DEFAULT_CATS); d.cats.income = d.cats.income || []; d.cats.expense = d.cats.expense || [];
  d.recurring = d.recurring || {}; d.plans = d.plans || {}; d.budgets = d.budgets || {}; d.goals = d.goals || {}; d.skips = d.skips || {};
  let changed = false;
  if ((d.ver || 1) < 2) {
    const at = d.cats.expense.indexOf("Other");
    BIZ_CATS.forEach(c => { if (!d.cats.expense.includes(c)) { if (at >= 0) d.cats.expense.splice(d.cats.expense.indexOf("Other"), 0, c); else d.cats.expense.push(c); } });
    d.ver = 2; changed = true;
  }
  return [d, changed];
}
{ const raw = load(); if (raw) { const [d, ch] = normalize(raw); S.data = d; if (ch) persist(); } }
if (navigator.storage?.persist) navigator.storage.persist().catch(() => {});

const accounts = all => Object.entries(S.data.accounts).map(([id, a]) => ({id, ...a})).filter(a => all || !a.archived).sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || a.name.localeCompare(b.name));
const people = all => Object.entries(S.data.people).map(([id, p]) => ({id, ...p})).filter(p => all || !p.archived).sort((a, b) => a.name.localeCompare(b.name));
const entries = (o) => Object.entries(o).map(([id, x]) => ({id, ...x}));
const kindOf = a => GROUPS[a?.group]?.kind || "asset";
const accName = id => S.data.accounts[id]?.name || "Deleted account";
const accIcon = id => GROUPS[S.data.accounts[id]?.group]?.icon || "wallet";
const pName = id => S.data.people[id]?.name || "Someone";
const pKind = id => S.data.people[id]?.kind || "other";
const allTxns = () => Object.entries(S.data.txns).map(([id, t]) => ({...t, id}));
const txnBiz = t => t.type === "expense" ? (t.biz || null)
  : t.type === "income" ? (t.biz || (S.data.incomeBiz || {})[t.cat] || (t.cat === "Internet business" ? "internet" : /rent/i.test(t.cat || "") ? "rental" : null))
  : t.type === "ar_charge" ? KINDS[pKind(t.person)].biz : null;

function compute() {
  const A = S.data.accounts, bal = {}, rec = {};
  for (const id in A) bal[id] = A[id].opening || 0;
  for (const id in S.data.people) rec[id] = S.data.people[id].opening || 0;
  const ap = (id, d) => { if (id in bal) bal[id] += kindOf(A[id]) === "liability" ? -d : d; };
  for (const t of allTxns()) {
    if (t.type === "expense") ap(t.acct, -t.amt);
    else if (t.type === "income") ap(t.acct, t.amt);
    else if (t.type === "transfer") { ap(t.acct, -t.amt); ap(t.to, t.amt); }
    else if (t.type === "ar_charge") { if (t.person in rec) rec[t.person] += t.amt; if (t.acct) ap(t.acct, -t.amt); }
    else if (t.type === "ar_collect") { ap(t.acct, t.amt); if (t.person in rec) rec[t.person] -= t.amt; }
  }
  return {bal, rec};
}
/* P&L for a date prefix set: test(date) */
function pnl(test, bizFilter) {
  const inc = {}, exp = {}; let collected = 0, lent = 0;
  for (const t of allTxns()) {
    if (!t.date || !test(t.date)) continue;
    const b = txnBiz(t);
    if (bizFilter !== undefined && b !== bizFilter) continue;
    if (t.type === "expense") exp[t.cat] = (exp[t.cat] || 0) + t.amt;
    else if (t.type === "income") inc[t.cat] = (inc[t.cat] || 0) + t.amt;
    else if (t.type === "ar_charge") { const k = KINDS[pKind(t.person)]; if (k.income) inc[k.income] = (inc[k.income] || 0) + t.amt; else lent += t.amt; }
    else if (t.type === "ar_collect") collected += t.amt;
  }
  const sum = o => Object.values(o).reduce((a, b) => a + b, 0);
  return {inc, exp, tIn: sum(inc), tOut: sum(exp), collected, lent};
}
const monthStats = mk => pnl(d => d.startsWith(mk));
function aging(pid) {
  const p = S.data.people[pid]; const tx = allTxns().filter(x => x.person === pid);
  const charges = [];
  if (p.opening) charges.push({prior: true, amt: p.opening});
  tx.filter(x => x.type === "ar_charge").sort((a, b) => a.date.localeCompare(b.date)).forEach(x => charges.push({date: x.date, amt: x.amt}));
  let credit = tx.filter(x => x.type === "ar_collect").reduce((s, x) => s + x.amt, 0);
  const b = [0, 0, 0];
  for (const c of charges) {
    const use = Math.min(credit, c.amt); credit -= use; const left = c.amt - use;
    if (!left) continue;
    const age = c.prior ? 999 : -daysUntil(c.date);
    b[age <= 30 ? 0 : age <= 60 ? 1 : 2] += left;
  }
  const last = tx.filter(x => x.type === "ar_collect").sort((a, b) => b.date.localeCompare(a.date))[0];
  return {b, last};
}
function cardStatus(a) {
  const st = a.stmt; if (!st) return null;
  const paid = allTxns().filter(t => t.type === "transfer" && t.to === a.id && t.date >= st.date).reduce((s, t) => s + t.amt, 0);
  const left = Math.max(0, st.bal - paid), minLeft = Math.max(0, (st.min || 0) - paid), d = daysUntil(st.due);
  let pill;
  if (left === 0) pill = ["ok", "Paid in full"];
  else if (d < 0) pill = ["bad", `Overdue ${-d}d`];
  else if (d === 0) pill = ["bad", "Due today"];
  else if (d <= 5) pill = ["warn", `Due in ${d}d`];
  else pill = ["", `Due ${dShort(st.due)}`];
  return {paid, left, minLeft, d, pill};
}
function loanStatus(a, bal) {
  if (!a.monthly) return null;
  const mk = mKey(today()); const day = Math.min(a.dueDay || 1, lastDay(mk));
  const paidThisMonth = allTxns().filter(t => t.type === "transfer" && t.to === a.id && t.date.startsWith(mk)).reduce((s, t) => s + t.amt, 0);
  const pairedInterest = allTxns().filter(t => t.type === "expense" && t.pairTo === a.id && t.date.startsWith(mk)).reduce((s, t) => s + t.amt, 0);
  let due = `${mk}-${pad(day)}`; if (paidThisMonth + pairedInterest >= a.monthly) { const nm = mShift(mk, 1); due = `${nm}-${pad(Math.min(a.dueDay || 1, lastDay(nm)))}`; }
  const monthsLeft = bal > 0 ? Math.ceil(bal / a.monthly) : 0;
  const d = daysUntil(due);
  const pill = bal <= 0 ? ["ok", "Paid off"] : d < 0 ? ["bad", `Overdue ${-d}d`] : d <= 5 ? ["warn", `Due in ${d}d`] : ["", `Due ${dShort(due)}`];
  return {due, monthsLeft, paidThisMonth, pill};
}
function planStatus(pl) {
  const billed = Math.max(0, Math.min(pl.months, mDiff(pl.start, mKey(today())) + 1));
  const remaining = Math.max(0, (pl.months - billed) * pl.monthly);
  return {billed, remaining, done: billed >= pl.months};
}
function commitments(n) {
  const out = []; const start = mKey(today()); const loans = accounts().filter(a => a.group === "loan" && a.monthly);
  const {bal} = compute();
  for (let i = 0; i < n; i++) {
    const mk = mShift(start, i); let inst = 0, ln = 0;
    entries(S.data.plans).forEach(pl => { const idx = mDiff(pl.start, mk); if (idx >= 0 && idx < pl.months) inst += pl.monthly; });
    loans.forEach(a => { if (bal[a.id] - a.monthly * i > 0) ln += Math.min(a.monthly, bal[a.id] - a.monthly * i); });
    out.push({mk, inst, ln, total: inst + ln});
  }
  return out;
}
/* recurring */
function occurrences(r, from, to) {
  const out = []; if (from > to) return out;
  if (r.freq === "weekly") {
    let d = from; const wd = parseISO(d).getDay(); d = addDays(d, ((r.wd ?? 1) - wd + 7) % 7);
    while (d <= to) { out.push(d); d = addDays(d, 7); }
    return out;
  }
  const days = r.freq === "semimonthly" ? (r.days || [15, 30]) : [r.day || 1];
  for (let mk = mKey(from); mk <= mKey(to); mk = mShift(mk, 1)) {
    const ld = lastDay(mk);
    [...new Set(days.map(x => Math.min(x, ld)))].sort((a, b) => a - b).forEach(x => { const d = `${mk}-${pad(x)}`; if (d >= from && d <= to) out.push(d); });
  }
  return out;
}
function dueRecurring() {
  const t = today(), floor = addDays(t, -62);
  const done = new Set(allTxns().filter(x => x.rid).map(x => x.rid + "|" + x.rdate));
  const list = [];
  entries(S.data.recurring).filter(r => !r.paused).forEach(r => {
    const from = r.start > floor ? r.start : floor;
    occurrences(r, from, t).forEach(d => { if (!done.has(r.id + "|" + d) && !(S.data.skips[r.id] || []).includes(d)) list.push({r, d}); });
  });
  return list.sort((a, b) => a.d.localeCompare(b.d));
}
const nextOccurrence = r => occurrences(r, today() > r.start ? today() : r.start, addDays(today(), 70))[0];
const freqLabel = r => r.freq === "weekly" ? `Every ${WD[r.wd ?? 1]}` : r.freq === "semimonthly" ? `Twice a month · ${(r.days || [15, 30]).map(ordinal).join(" & ")}` : `Monthly · ${ordinal(r.day || 1)}`;
function budgetUse(cat, mk) {
  const lim = S.data.budgets[cat]; if (!lim) return null;
  const spent = allTxns().filter(t => t.type === "expense" && t.cat === cat && t.date.startsWith(mk)).reduce((s, t) => s + t.amt, 0);
  const pct = spent / lim; return {lim, spent, pct, cls: pct >= 1 ? "bad" : pct >= .8 ? "warn" : "ok"};
}
function goalProgress(g, bal) { const have = g.acct ? Math.max(0, bal[g.acct] || 0) : (g.saved || 0); return {have, pct: Math.min(1, have / g.target)}; }

function putTxn(t) { const {id, ...body} = t; S.data.txns[id] = body; save(); }
function delTxn(id) { withUndo("Entry deleted", () => { delete S.data.txns[id]; }); }
/* Snapshot the whole book, apply the change, offer Undo for 6 seconds. */
function withUndo(label, fn) {
  const snap = JSON.stringify(S.data); fn(); save();
  const r = $("#toast-root"); clearTimeout(toastTimer);
  r.innerHTML = `<div class="toast" role="status" style="display:flex;gap:12px;align-items:center"><span>${esc(label)}</span><button type="button" class="btn" id="undo">Undo</button></div>`;
  r.querySelector("#undo").onclick = () => { S.data = JSON.parse(snap); save(); r.innerHTML = ""; toast("Restored"); };
  toastTimer = setTimeout(() => r.innerHTML = "", 6000);
}

/* ================= UI primitives ================= */
let toastTimer;
function toast(msg, bad) {
  const r = $("#toast-root"); r.innerHTML = `<div class="toast${bad ? " bad" : ""}" role="status">${esc(msg)}</div>`;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => r.innerHTML = "", bad ? 4200 : 2400);
}
function closeSheet() { $("#sheet-root").innerHTML = ""; document.body.style.overflow = ""; }
function openSheet(title, html, mount) {
  const r = $("#sheet-root");
  r.innerHTML = `<div class="scrim" data-close></div><div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="sheet-in"><div class="grab"></div><div class="sheet-h"><h2>${esc(title)}</h2><button type="button" class="x" data-close aria-label="Close">×</button></div>${html}</div></div>`;
  document.body.style.overflow = "hidden";
  r.querySelectorAll("[data-close]").forEach(b => b.onclick = closeSheet);
  mount?.(r.querySelector(".sheet-in"));
}
document.addEventListener("keydown", e => { if (e.key === "Escape") closeSheet(); });
const chipsHTML = (name, items, sel) => `<div class="chips" role="radiogroup">${items.map(([v, l, ic]) => `<label class="chip"><input type="radio" name="${name}" value="${esc(v)}"${v === sel ? " checked" : ""}><span>${ic ? ico(ic) : ""}${esc(l)}</span></label>`).join("")}</div>`;
const tilesHTML = (name, items, sel) => `<div class="tiles" role="radiogroup">${items.map(([v, l, ic]) => `<label class="tpick"><input type="radio" name="${name}" value="${esc(v)}"${v === sel ? " checked" : ""}><span>${ico(ic)}${esc(l)}</span></label>`).join("")}</div>`;
const accChips = filt => accounts().filter(filt).map(a => [a.id, a.name, GROUPS[a.group].icon]);
const bizChips = sel => chipsHTML("biz", [["", "Personal", "user"], ...Object.entries(BIZ).map(([k, b]) => [k, b.label, b.icon])], sel || "");
const val = (root, name) => root.querySelector(`input[name="${name}"]:checked`)?.value ?? null;
const amtVal = c => c ? (c / 100).toFixed(2) : "";
const progHTML = (pct, cls) => `<div class="prog"><i class="${cls || ""}" style="width:${Math.max(2, Math.min(100, pct * 100)).toFixed(1)}%"></i></div>`;
function armDelete(btn, fn) { let armed = false; btn.onclick = () => { if (!armed) { armed = true; btn.textContent = "Tap again to delete"; return; } fn(); }; }
function download(name, text, type) {
  const u = URL.createObjectURL(new Blob([text], {type})); const a = document.createElement("a");
  a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 3000);
}
function readAmt(root, sel, {required, label}) {
  const raw = root.querySelector(sel).value.trim();
  if (!raw) return required ? {err: `Enter the ${label}.`} : {v: 0};
  const v = parseAmt(raw); if (v == null && !isZeroish(raw)) return {err: `${label[0].toUpperCase() + label.slice(1)} must be a number.`};
  if (required && !v) return {err: `Enter the ${label}.`};
  return {v: v || 0};
}

/* ================= render ================= */
$("#nav-in").innerHTML = NAV.map(([k, l, ic]) => `<button type="button" data-v="${k}">${ico(ic)}${l}</button>`).join("");
$("#fab").innerHTML = ico("plus");
$("#back").innerHTML = ico("back");
const navOf = v => SUB[v] ? "more" : v;
function render() {
  const v = $("#view"); const ready = !!S.data;
  $("#nav").hidden = !ready; $("#fab").hidden = !ready;
  document.querySelectorAll(".nav button").forEach(b => b.setAttribute("aria-current", b.dataset.v === navOf(S.view) ? "page" : "false"));
  $("#mswitch").hidden = !(ready && ["home", "activity", "reports", "budgets"].includes(S.view));
  $("#mlabel").textContent = mLabel(S.month);
  $("#back").hidden = !SUB[S.view];
  if (!ready) return renderSetup(v);
  const titles = {home: "Ledger", activity: "Activity", owe: "I owe", owed: "Owed to me", more: "More", ...SUB};
  if (!titles[S.view]) S.view = "home";
  $("#title").textContent = titles[S.view];
  ({home: renderHome, activity: renderActivity, owe: renderOwe, owed: renderOwed, more: renderMore, reports: renderReports, budgets: renderBudgets, goals: renderGoals, recurring: renderRecurring, accounts: renderAccounts, security: renderSecurity})[S.view](v);
}

function txnRow(t) {
  let title, sub, amt, cls = "", icon;
  if (t.type === "expense") { title = t.cat; sub = accName(t.acct); amt = "−" + fmt(t.amt); cls = "out"; icon = catIcon(t.cat); }
  else if (t.type === "income") { title = t.cat; sub = accName(t.acct); amt = "+" + fmt(t.amt); cls = "in"; icon = catIcon(t.cat); }
  else if (t.type === "transfer") { const toLib = kindOf(S.data.accounts[t.to]) === "liability"; title = toLib ? "Paid " + accName(t.to) : "Transfer"; sub = accName(t.acct) + " → " + accName(t.to); amt = fmt(t.amt); icon = toLib ? accIcon(t.to) : "swap"; }
  else if (t.type === "ar_charge") { const k = pKind(t.person), loan = k === "loan"; title = (loan ? "Lent to " : "Billed ") + pName(t.person); sub = loan ? "From " + accName(t.acct) : KINDS[k].label + " · receivable"; amt = fmt(t.amt); cls = "muted"; icon = loan ? "coins" : "bill"; }
  else if (t.type === "ar_collect") { title = "Received from " + pName(t.person); sub = accName(t.acct); amt = "+" + fmt(t.amt); cls = "in"; icon = KINDS[pKind(t.person)].icon; }
  const b = t.type === "expense" && t.biz ? BIZ[t.biz]?.label : null; if (b) sub = b + " · " + sub;
  if (t.note) sub += " · " + t.note;
  return `<button type="button" class="row" data-tx="${esc(t.id)}"><span class="tile t-${t.type}">${ico(icon)}</span><div class="main"><div class="t">${esc(title)}</div><div class="s">${esc(sub)}</div></div><div class="a ${cls}">${amt}</div></button>`;
}
function wireRows(root) {
  root.querySelectorAll("[data-tx]").forEach(b => b.onclick = () => {
    const t = S.data.txns[b.dataset.tx]; if (!t) return; const tx = {...t, id: b.dataset.tx};
    tx.type === "ar_charge" ? openCharge(tx.person, tx) : openTxn({edit: tx});
  });
}
const barsHTML = (obj, inc) => {
  const rows = Object.entries(obj).sort((a, b) => b[1] - a[1]); const max = rows[0]?.[1] || 1;
  return `<div class="bars">${rows.map(([k, v]) => `<div class="bar-row"><span class="tile sm t-${inc ? "income" : "expense"}">${ico(catIcon(k))}</span><span class="nm">${esc(k)}</span><span class="amt">${fmt(v)}</span><div class="bar-track"><div class="bar-fill${inc ? " inc" : ""}" style="width:${Math.max(2, v / max * 100).toFixed(1)}%"></div></div></div>`).join("")}</div>`;
};
const go = view => { S.view = view; if (NAV.some(n => n[0] === view)) pref.set("view", view); closeSheet(); window.scrollTo(0, 0); render(); };
const wireGo = v => v.querySelectorAll("[data-go]").forEach(b => b.onclick = () => go(b.dataset.go));

let installEvt = null;
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); installEvt = e; if (S.view === "home") render(); });
const standalone = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone;

/* ---------- Home ---------- */
function dueHTML(list, limit) {
  return `<div>${list.slice(0, limit).map(({r, d}) => `<div class="due-row"><span class="tile sm t-${r.type}">${ico(r.type === "transfer" ? (kindOf(S.data.accounts[r.to]) === "liability" ? accIcon(r.to) : "swap") : catIcon(r.cat))}</span>
    <button type="button" class="main" data-dueedit="${r.id}|${d}"><div class="t" style="font-weight:600;font-size:14px">${esc(r.name)}</div><div class="s muted" style="font-size:12.5px">${esc(dShort(d))} · ${r.type === "income" ? "+" : ""}${fmt(r.amt)}</div></button>
    <button type="button" class="iconbtn" data-dueskip="${r.id}|${d}" aria-label="Skip ${esc(r.name)} for ${esc(dShort(d))}">${ico("x")}</button>
    <button type="button" class="iconbtn go" data-dueok="${r.id}|${d}" aria-label="Confirm ${esc(r.name)} for ${esc(dShort(d))}">${ico("check")}</button></div>`).join("")}</div>`;
}
function wireDue(v) {
  const get = s => { const [id, d] = s.split("|"); return {r: {...S.data.recurring[id], id}, d}; };
  v.querySelectorAll("[data-dueok]").forEach(b => b.onclick = () => { const {r, d} = get(b.dataset.dueok); confirmRecurring(r, d); });
  v.querySelectorAll("[data-dueskip]").forEach(b => b.onclick = () => { const {r, d} = get(b.dataset.dueskip); skipRecurring(r.id, d); });
  v.querySelectorAll("[data-dueedit]").forEach(b => b.onclick = () => { const {r, d} = get(b.dataset.dueedit); openTxn({type: r.type === "income" ? "income" : r.type, prefill: {amt: r.amt, cat: r.cat, acct: r.acct, to: r.to, biz: r.biz, note: r.name, date: d}, rid: r.id, rdate: d}); });
}
function recurringTxn(r, d) { const t = {id: newId(), type: r.type, amt: r.amt, date: d, at: Date.now(), acct: r.acct, rid: r.id, rdate: d, note: r.name}; if (r.type === "transfer") t.to = r.to; else t.cat = r.cat; if (r.type === "expense" && r.biz) t.biz = r.biz; return t; }
function confirmRecurring(r, d) { if (!S.data.accounts[r.acct] || (r.type === "transfer" && !S.data.accounts[r.to])) return toast("That recurring item points to a deleted account. Edit it in More → Recurring.", true); putTxn(recurringTxn(r, d)); toast(`${r.name} logged`); }
function skipRecurring(id, d) { const floor = addDays(today(), -70); const list = (S.data.skips[id] || []).filter(x => x >= floor); list.push(d); S.data.skips[id] = list; save(); toast("Skipped"); }

function renderHome(v) {
  const {bal, rec} = compute();
  const accs = accounts(true);
  const cash = accs.filter(a => kindOf(a) === "asset" && a.group !== "invest").reduce((s, a) => s + bal[a.id], 0);
  const inv = accs.filter(a => a.group === "invest").reduce((s, a) => s + bal[a.id], 0);
  const owed = accs.filter(a => kindOf(a) === "liability").reduce((s, a) => s + bal[a.id], 0);
  const recv = Object.values(rec).reduce((s, x) => s + x, 0);
  const net = cash + inv + recv - owed;
  const m = monthStats(S.month);
  const dues = accounts().filter(a => kindOf(a) === "liability").map(a => ({a, st: a.group === "loan" ? loanStatus(a, bal[a.id]) : cardStatus(a), loan: a.group === "loan"}))
    .filter(x => x.st && (x.loan ? bal[x.a.id] > 0 : x.st.left > 0)).sort((x, y) => (x.loan ? daysUntil(x.st.due) : x.st.d) - (y.loan ? daysUntil(y.st.due) : y.st.d));
  const recent = allTxns().filter(t => t.date.startsWith(S.month)).sort((a, b) => b.date.localeCompare(a.date) || (b.at || 0) - (a.at || 0)).slice(0, 6);
  const due = dueRecurring();
  const budgets = Object.keys(S.data.budgets).map(c => ({c, u: budgetUse(c, S.month)})).filter(x => x.u).sort((a, b) => b.u.pct - a.u.pct).slice(0, 4);
  const goals = entries(S.data.goals).slice(0, 3);
  const [whole, cents] = fmt(net).split(".");
  const n = Object.keys(S.data.txns).length;
  const lb = S.data.lastBackup; const needBackup = n >= 5 && (!lb || -daysUntil(lb) > 14);
  v.innerHTML = `
  ${installEvt && !standalone() ? `<div class="banner"><span>Install the app so it opens offline from your home screen.</span><button type="button" class="btn primary" id="install">${ico("install")}Install</button></div>` : ""}
  ${needBackup ? `<div class="banner warn"><span>${lb ? `Last backup ${-daysUntil(lb)} days ago.` : "You haven't backed up yet."} Your data lives only on this phone.</span><button type="button" class="btn" data-go="security">${ico("down")}Back up</button></div>` : ""}
  <section class="hero" aria-label="Net worth">
    <div class="eyebrow">Net worth · as of today</div>
    <div class="big">${net < 0 ? "−" : ""}${esc(whole)}<small>.${cents}</small></div>
    <div class="hero-grid">
      <div><div class="k">${ico("wallet")}Cash &amp; bank</div><div class="v">${pesoShort(cash)}</div></div>
      <div><div class="k">${ico("coins")}Owed to me</div><div class="v in">${pesoShort(recv)}</div></div>
      <div><div class="k">${ico("card")}I owe</div><div class="v out">${pesoShort(owed)}</div></div>
    </div>
  </section>
  <div class="quick">
    <button type="button" data-q="expense"><span class="tile t-expense">${ico("out")}</span>Expense</button>
    <button type="button" data-q="income"><span class="tile t-income">${ico("in")}</span>Income</button>
    <button type="button" data-q="pay"><span class="tile t-transfer">${ico("card")}</span>Pay bill</button>
    <button type="button" data-q="collect"><span class="tile t-ar_collect">${ico("coins")}</span>Got paid</button>
  </div>
  ${due.length ? `<section class="card"><div class="section-h"><h2>To confirm · ${due.length}</h2><button type="button" class="link" data-go="recurring">Recurring</button></div>${dueHTML(due, 5)}${due.length > 5 ? `<p class="hint" style="margin:8px 0 0">${due.length - 5} more in Recurring.</p>` : ""}</section>` : ""}
  <section class="card">
    <div class="section-h"><h2>${esc(mLabel(S.month, true))}</h2>${S.month !== mKey(today()) ? `<button type="button" class="btnchip" id="to-now">${ico("calendar")}Back to ${esc(mName(mKey(today())))}</button>` : `<button type="button" class="link" data-go="reports">Reports</button>`}</div>
    <div class="pl">
      <div><div class="v in">${pesoShort(m.tIn)}</div><div class="k">Income</div></div>
      <div><div class="v out">${pesoShort(m.tOut)}</div><div class="k">Expenses</div></div>
      <div><div class="v ${m.tIn - m.tOut < 0 ? "out" : ""}">${pesoShort(m.tIn - m.tOut)}</div><div class="k">Net</div></div>
    </div>
    ${m.collected || m.lent ? `<div class="note">Collected ${fmt(m.collected)} from people who owe you${m.lent ? ` · lent out ${fmt(m.lent)}` : ""}</div>` : ""}
  </section>
  ${dues.length ? `<section class="card"><div class="section-h"><h2>Coming due</h2><button type="button" class="link" data-go="owe">I owe</button></div><div class="rows">
    ${dues.map(({a, st, loan}) => `<div class="row"><span class="tile t-transfer">${ico(GROUPS[a.group].icon)}</span><div class="main"><div class="t">${esc(a.name)}</div><div class="s">${loan ? `Monthly ${fmt(a.monthly)}` : `Left ${fmt(st.left)}${st.minLeft ? ` · min ${fmt(st.minLeft)}` : ""}`}</div></div><span class="pill ${st.pill[0]}">${esc(st.pill[1])}</span></div>`).join("")}
  </div></section>` : ""}
  ${budgets.length ? `<section class="card"><div class="section-h"><h2>Budgets</h2><button type="button" class="link" data-go="budgets">All</button></div><div>
    ${budgets.map(({c, u}) => `<div class="brow"><span class="tile sm t-expense">${ico(catIcon(c))}</span><span class="nm">${esc(c)}</span><span class="rt">${pesoShort(u.spent)} / ${pesoShort(u.lim)}</span>${progHTML(u.pct, u.cls)}</div>`).join("")}</div></section>` : ""}
  <section class="card">
    <div class="section-h"><h2>Where it went</h2><span class="muted num" style="font-size:13px">${fmt(m.tOut)}</span></div>
    ${Object.keys(m.exp).length ? barsHTML(m.exp) : `<p class="muted" style="margin:0">No expenses in ${esc(mName(S.month))} yet. Tap Expense above to log one.</p>`}
  </section>
  <section class="card">
    <div class="section-h"><h2>Income streams</h2><span class="muted num" style="font-size:13px">${fmt(m.tIn)}</span></div>
    ${Object.keys(m.inc).length ? barsHTML(m.inc, true) : `<p class="muted" style="margin:0">No income logged in ${esc(mName(S.month))} yet.</p>`}
  </section>
  ${goals.length ? `<section class="card"><div class="section-h"><h2>Savings goals</h2><button type="button" class="link" data-go="goals">All</button></div><div>
    ${goals.map(g => { const p = goalProgress(g, bal); return `<div class="brow"><span class="tile sm t-income">${ico("target")}</span><span class="nm">${esc(g.name)}</span><span class="rt">${Math.round(p.pct * 100)}%</span>${progHTML(p.pct, p.pct >= 1 ? "ok" : "")}</div>`; }).join("")}</div></section>` : ""}
  <section class="card">
    <div class="section-h"><h2>Recent</h2><button type="button" class="link" data-go="activity">See all</button></div>
    ${recent.length ? `<div class="rows">${recent.map(txnRow).join("")}</div>` : `<p class="muted" style="margin:0">Nothing logged this month.</p>`}
  </section>`;
  wireRows(v); wireGo(v); wireDue(v);
  const tn = $("#to-now"); if (tn) tn.onclick = () => { S.month = mKey(today()); render(); };
  v.querySelectorAll("[data-q]").forEach(b => b.onclick = () => {
    const q = b.dataset.q;
    if (q === "pay") { const first = dues[0]; openTxn({type: "transfer", to: first?.a.id || accounts().find(a => kindOf(a) === "liability")?.id, amt: first ? (first.loan ? first.a.monthly : first.st.left) : null}); }
    else openTxn({type: q});
  });
  const ib = $("#install"); if (ib) ib.onclick = async () => { installEvt.prompt(); await installEvt.userChoice.catch(() => {}); installEvt = null; render(); };
}

/* ---------- Activity (with search) ---------- */
function txnText(t) { return [t.cat, t.note, t.acct && accName(t.acct), t.to && accName(t.to), t.person && pName(t.person), t.biz && BIZ[t.biz]?.label, (t.amt / 100).toFixed(2), String(Math.round(t.amt / 100))].filter(Boolean).join(" ").toLowerCase(); }
function renderActivity(v) {
  const F = [["all", "All", "list"], ["expense", "Expenses", "out"], ["income", "Income", "in"], ["transfer", "Transfers", "swap"], ["ar", "Owed to me", "coins"]];
  v.innerHTML = `
  <label class="search">${ico("search")}<input type="search" id="q" placeholder="Search all entries — Shopee, a name, 1500" value="${esc(S.q)}" autocomplete="off"></label>
  <section class="card" id="act-sum"></section>
  <div class="filters">${F.map(([k, l, ic]) => `<button type="button" class="btnchip" data-f="${k}" aria-pressed="${S.filter === k}">${ico(ic)}${l}</button>`).join("")}</div>
  <section class="card" style="padding-block:4px 10px" id="act-list"></section>`;
  v.querySelectorAll("[data-f]").forEach(b => b.onclick = () => { S.filter = b.dataset.f; v.querySelectorAll("[data-f]").forEach(x => x.setAttribute("aria-pressed", x === b)); fillActivity(v); });
  $("#q").oninput = e => { S.q = e.target.value; fillActivity(v); };
  fillActivity(v);
}
function fillActivity(v) {
  const q = S.q.trim().toLowerCase();
  const words = q.split(/\s+/).filter(Boolean);
  let list = allTxns();
  list = q ? list.filter(t => { const s = txnText(t); return words.every(w => s.includes(w.replace(/[₱,]/g, ""))); }) : list.filter(t => t.date.startsWith(S.month));
  list = list.filter(t => S.filter === "all" || (S.filter === "ar" ? t.type.startsWith("ar_") : t.type === S.filter)).sort((a, b) => b.date.localeCompare(a.date) || (b.at || 0) - (a.at || 0));
  const tin = list.filter(t => t.type === "income" || (t.type === "ar_charge" && KINDS[pKind(t.person)].income)).reduce((s, t) => s + t.amt, 0);
  const tout = list.filter(t => t.type === "expense").reduce((s, t) => s + t.amt, 0);
  $("#act-sum").innerHTML = `<div class="pl"><div><div class="v in">${pesoShort(tin)}</div><div class="k">Income</div></div><div><div class="v out">${pesoShort(tout)}</div><div class="k">Expenses</div></div><div><div class="v">${list.length}</div><div class="k">${q ? "matches, all time" : "entries"}</div></div></div>`;
  const days = {}; list.slice(0, 300).forEach(t => (days[t.date] = days[t.date] || []).push(t));
  const box = $("#act-list");
  box.innerHTML = list.length ? Object.entries(days).map(([d, ts]) => `<div class="day-h">${esc(dLabel(d))}${q ? " · " + d.slice(0, 4) : ""}</div><div class="rows">${ts.map(txnRow).join("")}</div>`).join("") + (list.length > 300 ? `<p class="hint">Showing the latest 300. Narrow your search to see more.</p>` : "")
    : `<div class="empty" style="padding:22px 8px"><p style="margin:0">${q ? "No entries match that search." : `Nothing here for ${esc(mLabel(S.month, true))}.`}</p></div>`;
  wireRows(box);
}

/* ---------- I owe ---------- */
function renderOwe(v) {
  const {bal} = compute();
  const libs = accounts().filter(a => kindOf(a) === "liability");
  const cards = libs.filter(a => a.group !== "loan"), loans = libs.filter(a => a.group === "loan");
  const plans = entries(S.data.plans).sort((a, b) => a.start.localeCompare(b.start));
  const total = libs.reduce((s, a) => s + bal[a.id], 0);
  const mk = mKey(today());
  const fees = id => allTxns().filter(t => t.type === "expense" && t.acct === id && t.cat === "Interest & fees" && t.date.startsWith(mk)).reduce((s, t) => s + t.amt, 0);
  const com = commitments(6); const comMax = Math.max(1, ...com.map(c => c.total));
  v.innerHTML = `
  <section class="hero"><div class="eyebrow">Total I owe</div><div class="big out" style="font-size:30px">${fmt(total)}</div><p class="hint" style="margin:8px 0 0">Pay logs a transfer from your bank, so it never counts as an expense twice.</p></section>
  ${cards.length ? `<div class="lbl">Cards &amp; pay later</div>` : ""}
  ${cards.map(a => {
    const st = cardStatus(a); const f = fees(a.id);
    return `<section class="card cc">
      <div class="cc-top"><div class="cc-id"><span class="tile t-transfer">${ico(GROUPS[a.group].icon)}</span><div><h3>${esc(a.name)}</h3><div class="muted" style="font-size:12.5px">${esc(GROUPS[a.group].label)}${a.limit ? ` · ${pesoShort(Math.max(0, a.limit - bal[a.id]))} available` : ""}</div></div></div>
        <div class="cc-owed"><div class="v">${fmt(bal[a.id])}</div><div class="muted" style="font-size:12px">balance now</div></div></div>
      ${st ? `<div class="stmt">
          <div><div class="k">Statement</div><div class="v">${fmt(a.stmt.bal)}</div></div>
          <div><div class="k">Paid since</div><div class="v">${fmt(st.paid)}</div></div>
          <div><div class="k">Left to pay</div><div class="v ${st.left ? "out" : "in"}">${fmt(st.left)}</div></div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap"><span class="pill ${st.pill[0]}">${esc(st.pill[1])}</span><span class="muted" style="font-size:12.5px">${a.stmt.min ? `Min due ${fmt(a.stmt.min)} · ` : ""}due ${esc(dShort(a.stmt.due))}</span></div>`
      : `<p class="hint" style="margin:0">${suggestStatement(a) ? `Statement cut on ${esc(dShort(suggestStatement(a).date))}: about ${fmt(suggestStatement(a).bal)}. Tap Add statement to confirm it.` : "Add this month's statement to track what's due and when."}</p>`}
      ${st && suggestStatement(a) && a.stmt.date < suggestStatement(a).date ? `<p class="hint" style="margin:0">A newer statement cut on ${esc(dShort(suggestStatement(a).date))}. Tap New statement to update.</p>` : ""}
      ${f ? `<div class="hint">Interest &amp; fees this month: <b class="out num">${fmt(f)}</b></div>` : ""}
      <div class="actions"><button type="button" class="btn primary" data-pay="${a.id}">${ico("swap")}Pay</button><button type="button" class="btn" data-stmt="${a.id}">${ico("bill")}${st ? "New statement" : "Add statement"}</button></div>
    </section>`; }).join("")}
  <div class="lbl">Loans I owe</div>
  ${loans.map(a => { const st = loanStatus(a, bal[a.id]); return `<section class="card cc">
      <div class="cc-top"><div class="cc-id"><span class="tile t-expense">${ico("loan")}</span><div><h3>${esc(a.name)}</h3><div class="muted" style="font-size:12.5px">${a.monthly ? `${fmt(a.monthly)}/mo · due ${ordinal(a.dueDay || 1)}` : "Set a monthly amortization to track due dates"}</div></div></div>
        <div class="cc-owed"><div class="v">${fmt(bal[a.id])}</div><div class="muted" style="font-size:12px">remaining</div></div></div>
      ${st ? `<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap"><span class="pill ${st.pill[0]}">${esc(st.pill[1])}</span><span class="muted" style="font-size:12.5px">${st.monthsLeft ? `About ${st.monthsLeft} payment${st.monthsLeft > 1 ? "s" : ""} left` : ""}</span></div>` : ""}
      <div class="actions"><button type="button" class="btn primary" data-pay="${a.id}">${ico("swap")}Pay</button><button type="button" class="btn" data-acc="${a.id}">${ico("edit")}Edit</button></div>
    </section>`; }).join("") || `<p class="hint" style="margin:0">GSIS, Pag-IBIG, bank or personal loans you're paying off.</p>`}
  <button type="button" class="btn block" id="addloan">${ico("pluscircle")}Add a loan I owe</button>
  <div class="lbl">Installments</div>
  ${plans.map(pl => { const s = planStatus(pl); return `<section class="card cc">
      <div class="cc-top"><div class="cc-id"><span class="tile t-ar_charge">${ico("layers")}</span><div><h3>${esc(pl.name)}</h3><div class="muted" style="font-size:12.5px">${esc(accName(pl.acct))} · ${fmt(pl.monthly)} × ${pl.months}</div></div></div>
        <div class="cc-owed"><div class="v">${fmt(s.remaining)}</div><div class="muted" style="font-size:12px">${s.done ? "finished" : "still to be billed"}</div></div></div>
      ${progHTML(s.billed / pl.months, s.done ? "ok" : "")}
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><span class="hint">${s.billed} of ${pl.months} billed · started ${esc(mLabel(pl.start))}</span><button type="button" class="btn" data-plan="${pl.id}" aria-label="Edit ${esc(pl.name)}">${ico("edit")}</button></div>
    </section>`; }).join("") || `<p class="hint" style="margin:0">Card 0% installments and SPayLater plans. Track how many months are left and what's still coming.</p>`}
  <button type="button" class="btn block" id="addplan">${ico("pluscircle")}Add installment plan</button>
  ${com.some(c => c.total) ? `<section class="card"><div class="section-h"><h2>Next 6 months</h2><span class="eyebrow">installments + loans</span></div><div>
    ${com.map(c => `<div class="brow"><span class="tile sm t-neutral">${ico("calendar")}</span><span class="nm">${esc(mLabel(c.mk))}</span><span class="rt">${fmt(c.total)}</span>${progHTML(c.total / comMax)}</div>`).join("")}</div></section>` : ""}`;
  v.querySelectorAll("[data-pay]").forEach(b => b.onclick = () => { const a = {...S.data.accounts[b.dataset.pay], id: b.dataset.pay}; const amt = a.group === "loan" ? a.monthly : cardStatus(a)?.left; openTxn({type: "transfer", to: a.id, amt: amt || null}); });
  v.querySelectorAll("[data-stmt]").forEach(b => b.onclick = () => openStatement(b.dataset.stmt));
  v.querySelectorAll("[data-acc]").forEach(b => b.onclick = () => openAccount(b.dataset.acc));
  v.querySelectorAll("[data-plan]").forEach(b => b.onclick = () => openPlan(b.dataset.plan));
  $("#addloan").onclick = () => openAccount(null, "loan");
  $("#addplan").onclick = () => openPlan();
}

/* ---------- Owed to me ---------- */
function renderOwed(v) {
  const {rec} = compute();
  const ps = people().filter(p => S.pfilter === "all" || p.kind === S.pfilter);
  const ag = Object.fromEntries(people(true).map(p => [p.id, aging(p.id)]));
  const tot = [0, 0, 0]; ps.forEach(p => ag[p.id].b.forEach((x, i) => tot[i] += x));
  const total = ps.reduce((s, p) => s + Math.max(0, rec[p.id]), 0);
  const mk = mKey(today());
  const billed = new Set(allTxns().filter(t => t.type === "ar_charge" && t.period === mk).map(t => t.person));
  const pending = people().filter(p => KINDS[p.kind].monthly && p.monthly && !billed.has(p.id));
  const sumB = tot[0] + tot[1] + tot[2];
  const F = [["all", "All", "users"], ["rent", "Rent", "key"], ["internet", "Internet", "wifi"], ["loan", "Loans", "coins"], ["other", "Other", "user"]];
  v.innerHTML = `
  <section class="hero">
    <div class="eyebrow">${S.pfilter === "all" ? "Total owed to me" : esc(KINDS[S.pfilter].label) + " · owed to me"}</div>
    <div class="big in" style="font-size:30px">${fmt(total)}</div>
    <div class="aging" aria-hidden="true">${sumB ? tot.map((x, i) => x ? `<span class="a${i}" style="flex:${x}"></span>` : "").join("") : `<span style="flex:1;background:var(--surface-2)"></span>`}</div>
    <div class="legend"><span><i class="a0"></i>0–30d ${pesoShort(tot[0])}</span><span><i class="a1"></i>31–60d ${pesoShort(tot[1])}</span><span><i class="a2"></i>60d+ ${pesoShort(tot[2])}</span></div>
  </section>
  <div class="filters">${F.map(([k, l, ic]) => `<button type="button" class="btnchip" data-pf="${k}" aria-pressed="${S.pfilter === k}">${ico(ic)}${l}</button>`).join("")}</div>
  ${pending.length ? `<button type="button" class="btn primary block" id="billall">${ico("bill")}Bill ${esc(mName(mk))} · ${pending.length} ${pending.length > 1 ? "people" : "person"}</button>` : ""}
  ${ps.map(p => { const a = ag[p.id], r = rec[p.id], k = KINDS[p.kind]; return `<section class="card cc">
    <div class="cc-top"><div class="cc-id"><span class="tile ${r > 0 ? "t-ar_charge" : "t-income"}">${ico(k.icon)}</span><div><h3>${esc(p.name)}</h3><div class="muted" style="font-size:12.5px">${esc(k.label)}${p.detail ? " · " + esc(p.detail) : ""}${k.monthly && p.monthly ? ` · ${pesoShort(p.monthly)}/mo · day ${p.dueDay || 1}` : ""}</div></div></div>
      <div class="cc-owed"><div class="v ${r > 0 ? "out" : ""}">${fmt(r)}</div><div class="muted" style="font-size:12px">${r < 0 ? "paid ahead" : r === 0 ? "settled" : "owes you"}</div></div></div>
    ${r > 0 ? `<div class="chips">${a.b[0] ? `<span class="pill ok">0–30d ${pesoShort(a.b[0])}</span>` : ""}${a.b[1] ? `<span class="pill warn">31–60d ${pesoShort(a.b[1])}</span>` : ""}${a.b[2] ? `<span class="pill bad">60d+ ${pesoShort(a.b[2])}</span>` : ""}</div>` : ""}
    <div class="hint">${a.last ? `Last paid ${fmt(a.last.amt)} on ${esc(dShort(a.last.date))}` : "No payments recorded yet"}</div>
    <div class="actions"><button type="button" class="btn primary" data-collect="${p.id}">${ico("coins")}Got paid</button><button type="button" class="btn" data-charge="${p.id}">${ico(p.kind === "loan" ? "out" : "bill")}${esc(k.charge)}</button><button type="button" class="btn" data-person="${p.id}" aria-label="Edit ${esc(p.name)}">${ico("edit")}</button></div>
  </section>`; }).join("")}
  ${ps.length ? "" : `<div class="empty"><h2>${S.pfilter === "all" ? "Who owes you?" : "No one here yet"}</h2><p>Add tenants, internet subscribers, or anyone you've lent money to. Each gets a running balance and aging.</p></div>`}
  <button type="button" class="btn block" id="addperson">${ico("pluscircle")}Add person</button>
  <p class="hint" style="margin:0">Rent and internet bills count as income when billed. A loan doesn't: it moves money from your account to "owed to me". "Got paid" reduces their balance and adds cash where you deposit it. If you bill internet subscribers here, don't also log that money under Income.</p>`;
  v.querySelectorAll("[data-pf]").forEach(b => b.onclick = () => { S.pfilter = b.dataset.pf; render(); });
  $("#addperson").onclick = () => openPerson(null, S.pfilter !== "all" ? S.pfilter : "rent");
  const ba = $("#billall"); if (ba) ba.onclick = () => billMonth(pending, mk);
  v.querySelectorAll("[data-collect]").forEach(b => b.onclick = () => openTxn({type: "collect", person: b.dataset.collect}));
  v.querySelectorAll("[data-charge]").forEach(b => b.onclick = () => openCharge(b.dataset.charge));
  v.querySelectorAll("[data-person]").forEach(b => b.onclick = () => openPerson(b.dataset.person));
}
function billMonth(list, mk) {
  const last = lastDay(mk);
  list.forEach(p => { S.data.txns[newId()] = {type: "ar_charge", person: p.id, amt: p.monthly, date: `${mk}-${pad(Math.min(p.dueDay || 1, last))}`, period: mk, at: Date.now()}; });
  save(); toast(`Billed ${list.length} for ${mName(mk)}`);
}

/* ---------- More ---------- */
function renderMore(v) {
  const due = dueRecurring().length;
  const items = [
    ["reports", "Reports", "Trends, P&L, business results", "chart", "t-transfer"],
    ["budgets", "Budgets", `${Object.keys(S.data.budgets).length || "No"} categories with a monthly limit`, "gauge", "t-expense"],
    ["goals", "Savings goals", `${Object.keys(S.data.goals).length || "No"} goals`, "target", "t-income"],
    ["recurring", "Recurring", due ? `${due} waiting to confirm` : `${Object.keys(S.data.recurring).length || "No"} recurring entries`, "recur", "t-ar_charge"],
    ["accounts", "Accounts", "Accounts, starting balances, categories", "wallet", "t-transfer"],
    ["security", "Security & backup", lockState() ? "PIN lock on" : "PIN lock off · export or restore", "shield", "t-neutral"],
  ];
  v.innerHTML = `<div class="menu">${items.map(([k, t, s, ic, cls]) => `<button type="button" class="row" data-go="${k}"><span class="tile ${cls}">${ico(ic)}</span><div class="main"><div class="t">${t}</div><div class="s">${esc(s)}</div></div>${ico("chev", "chev")}</button>`).join("")}</div>
  <p class="hint" style="margin:0">Pickle Jar sales stay in its own app. Log money you put in as a transfer to Pickle Jar capital, and money you take out as a transfer back.</p>`;
  wireGo(v);
}

/* ---------- Reports ---------- */
function trendSVG(months) {
  const data = months.map(mk => { const p = monthStats(mk); return {mk, i: p.tIn, o: p.tOut}; });
  const max = Math.max(1, ...data.map(d => Math.max(d.i, d.o)));
  const W = 340, H = 170, L = 34, B = 22, T = 10, cw = (W - L) / data.length, bw = Math.min(16, cw / 3);
  const y = v => T + (H - T - B) * (1 - v / max);
  const ticks = [0, .5, 1].map(f => max * f);
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Income and expenses for the last ${data.length} months">
    ${ticks.map(t => `<line class="gl" x1="${L}" x2="${W}" y1="${y(t).toFixed(1)}" y2="${y(t).toFixed(1)}"/><text x="${L - 6}" y="${(y(t) + 3).toFixed(1)}" text-anchor="end">${kShort(t)}</text>`).join("")}
    ${data.map((d, k) => { const cx = L + cw * k + cw / 2; return `<rect class="bi" x="${(cx - bw - 1).toFixed(1)}" y="${y(d.i).toFixed(1)}" width="${bw}" height="${(H - B - y(d.i)).toFixed(1)}" rx="2"/><rect class="bo" x="${(cx + 1).toFixed(1)}" y="${y(d.o).toFixed(1)}" width="${bw}" height="${(H - B - y(d.o)).toFixed(1)}" rx="2"/><text x="${cx.toFixed(1)}" y="${H - 6}" text-anchor="middle">${esc(mAbbr(d.mk))}</text>`; }).join("")}
  </svg>`;
}
function stmtHTML(p) {
  const lines = (o, cls) => Object.entries(o).sort((a, b) => b[1] - a[1]).map(([k, v]) => `<div class="ln sub"><span>${esc(k)}</span><span>${fmt(v)}</span></div>`).join("");
  return `<div class="stmt-tbl">
    <div class="ln"><span>Income</span><span class="in">${fmt(p.tIn)}</span></div>${lines(p.inc)}
    <div class="ln"><span>Expenses</span><span class="out">${fmt(p.tOut)}</span></div>${lines(p.exp)}
    <div class="ln tot"><span>Net income</span><span class="${p.tIn - p.tOut < 0 ? "out" : "in"}">${sfmt(p.tIn - p.tOut)}</span></div></div>`;
}
function renderReports(v) {
  const mk = S.month, yr = mk.slice(0, 4);
  const test = S.rmode === "month" ? d => d.startsWith(mk) : d => d.slice(0, 4) === yr && d.slice(0, 7) <= mk;
  const period = S.rmode === "month" ? mLabel(mk, true) : `Jan–${mAbbr(mk)} ${yr}`;
  const all = pnl(test), personal = pnl(test, null);
  const months = Array.from({length: 6}, (_, i) => mShift(mk, i - 5));
  const avg = months.reduce((s, m) => { const p = monthStats(m); return [s[0] + p.tIn, s[1] + p.tOut]; }, [0, 0]).map(x => x / 6);
  const rate = all.tIn ? (all.tIn - all.tOut) / all.tIn : 0;
  v.innerHTML = `
  <div class="seg2" role="group" aria-label="Period"><button type="button" data-rm="month" aria-pressed="${S.rmode === "month"}">This month</button><button type="button" data-rm="ytd" aria-pressed="${S.rmode === "ytd"}">Year to date</button></div>
  <section class="card"><div class="section-h"><h2>6-month trend</h2><span class="legend"><span><i class="a0"></i>Income</span><span><i class="a2"></i>Expenses</span></span></div>
    ${trendSVG(months)}
    <div class="kv" style="margin-top:10px"><div><div class="k">Avg income</div><div class="v in">${pesoShort(avg[0])}</div></div><div><div class="k">Avg expenses</div><div class="v out">${pesoShort(avg[1])}</div></div><div><div class="k">Savings rate</div><div class="v">${all.tIn ? Math.round(rate * 100) + "%" : "—"}</div></div></div>
  </section>
  <section class="card"><div class="section-h"><h2>Profit &amp; loss</h2><span class="eyebrow">${esc(period)}</span></div>${stmtHTML(all)}
    ${all.collected || all.lent ? `<p class="hint" style="margin:10px 0 0">Cash collected from receivables: ${fmt(all.collected)}${all.lent ? ` · lent out ${fmt(all.lent)} (not an expense)` : ""}</p>` : ""}</section>
  ${Object.entries(BIZ).map(([k, b]) => { const p = pnl(test, k); const margin = p.tIn ? (p.tIn - p.tOut) / p.tIn : null; return `<section class="card">
    <div class="section-h"><div class="cc-id"><span class="tile sm t-transfer">${ico(b.icon)}</span><h2>${esc(b.name)}</h2></div><span class="eyebrow">${margin == null ? "" : Math.round(margin * 100) + "% margin"}</span></div>
    ${p.tIn || p.tOut ? stmtHTML(p) : `<p class="hint" style="margin:0">Nothing yet. Tag expenses to ${esc(b.label)} when you log them, and its income shows up here automatically.</p>`}</section>`; }).join("")}
  <section class="card"><div class="section-h"><div class="cc-id"><span class="tile sm t-neutral">${ico("user")}</span><h2>Personal only</h2></div></div>
    <div class="kv"><div><div class="k">Income</div><div class="v in">${pesoShort(personal.tIn)}</div></div><div><div class="k">Expenses</div><div class="v out">${pesoShort(personal.tOut)}</div></div><div><div class="k">Net</div><div class="v">${pesoShort(personal.tIn - personal.tOut)}</div></div></div></section>`;
  v.querySelectorAll("[data-rm]").forEach(b => b.onclick = () => { S.rmode = b.dataset.rm; render(); });
}

/* ---------- Budgets ---------- */
function renderBudgets(v) {
  const cats = S.data.cats.expense;
  const withB = cats.filter(c => S.data.budgets[c]);
  const tl = withB.reduce((s, c) => s + S.data.budgets[c], 0), ts = withB.reduce((s, c) => s + budgetUse(c, S.month).spent, 0);
  v.innerHTML = `
  ${withB.length ? `<section class="hero"><div class="eyebrow">${esc(mName(S.month))} · budgeted spending</div><div class="big" style="font-size:28px">${fmt(ts)} <small>of ${fmt(tl)}</small></div><div style="margin-top:12px">${progHTML(ts / tl, ts / tl >= 1 ? "bad" : ts / tl >= .8 ? "warn" : "ok")}</div></section>` : ""}
  <section class="card"><div class="section-h"><h2>By category</h2><button type="button" class="link" id="setb">Set limits</button></div><div>
  ${withB.length ? withB.map(c => { const u = budgetUse(c, S.month); return `<div class="brow"><span class="tile sm t-expense">${ico(catIcon(c))}</span><span class="nm">${esc(c)}</span><span class="rt">${pesoShort(u.spent)} / ${pesoShort(u.lim)}</span>${progHTML(u.pct, u.cls)}</div>`; }).join("")
    : `<p class="muted" style="margin:0">No budgets yet. Tap Set limits to give categories like Groceries or Baby a monthly cap. You'll get a heads-up at 80%.</p>`}
  </div></section>
  ${withB.length ? `<p class="hint" style="margin:0">Left to spend this month: <b class="num">${fmt(Math.max(0, tl - ts))}</b></p>` : ""}`;
  $("#setb").onclick = openBudgets;
}
function openBudgets() {
  openSheet("Monthly budgets", `<p class="hint" style="margin:0">Leave blank for no limit.</p>
  <div class="sb-list">${S.data.cats.expense.map((c, i) => `<label class="sb-row"><span class="tile sm t-expense">${ico(catIcon(c))}</span><span class="sb-name">${esc(c)}</span><input class="input num" data-bud="${i}" inputmode="decimal" placeholder="No limit" value="${amtVal(S.data.budgets[c])}" aria-label="${esc(c)} monthly budget"></label>`).join("")}</div>
  <div class="err" id="b-err"></div><button type="button" class="btn primary block" id="b-save">${ico("check")}Save budgets</button>`, root => {
    root.querySelector("#b-save").onclick = () => {
      const out = {}; let bad = null;
      root.querySelectorAll("[data-bud]").forEach(i => { const r = i.value.trim(); if (!r) return; const v = parseAmt(r); if (v == null && !isZeroish(r)) bad = bad || i; else if (v) out[S.data.cats.expense[+i.dataset.bud]] = v; });
      if (bad) { root.querySelector("#b-err").textContent = "One of the limits isn't a number."; bad.focus(); return; }
      S.data.budgets = out; save(); closeSheet(); toast("Budgets saved");
    };
  });
}
function budgetNudge(t, before) {
  if (t.type !== "expense") return;
  const u = budgetUse(t.cat, mKey(t.date)); if (!u) return;
  const was = before / u.lim;
  if (u.pct >= 1 && was < 1) toast(`${t.cat}: over budget (${fmt(u.spent)} of ${fmt(u.lim)})`, true);
  else if (u.pct >= .8 && was < .8) toast(`${t.cat}: ${Math.round(u.pct * 100)}% of budget used`);
}

/* ---------- Goals ---------- */
function renderGoals(v) {
  const {bal} = compute(); const gs = entries(S.data.goals);
  v.innerHTML = `
  ${gs.map(g => { const p = goalProgress(g, bal); const left = Math.max(0, g.target - p.have); const ml = g.by ? Math.max(1, mDiff(mKey(today()), mKey(g.by)) + 1) : null; return `<section class="card cc">
    <div class="cc-top"><div class="cc-id"><span class="tile ${p.pct >= 1 ? "t-income" : "t-transfer"}">${ico("target")}</span><div><h3>${esc(g.name)}</h3><div class="muted" style="font-size:12.5px">${g.acct ? "Tracks " + esc(accName(g.acct)) : "Updated by hand"}${g.by ? " · by " + esc(dShort(g.by)) + " " + g.by.slice(0, 4) : ""}</div></div></div>
      <div class="cc-owed"><div class="v">${Math.round(p.pct * 100)}%</div><div class="muted" style="font-size:12px">${pesoShort(p.have)} of ${pesoShort(g.target)}</div></div></div>
    ${progHTML(p.pct, p.pct >= 1 ? "ok" : "")}
    <div class="hint">${p.pct >= 1 ? "Goal reached." : `${fmt(left)} to go${ml ? ` · about ${fmt(Math.ceil(left / ml))} a month` : ""}`}</div>
    <div class="actions">${g.acct ? `<button type="button" class="btn primary" data-gadd="${g.id}">${ico("swap")}Add money</button>` : `<button type="button" class="btn primary" data-gset="${g.id}">${ico("edit")}Update saved</button>`}<button type="button" class="btn" data-gedit="${g.id}" aria-label="Edit ${esc(g.name)}">${ico("sliders")}</button></div>
  </section>`; }).join("")}
  ${gs.length ? "" : `<div class="empty"><h2>Save toward something</h2><p>An emergency fund, the baby's needs, a new paddle line. Link a goal to a savings account and it tracks itself.</p></div>`}
  <button type="button" class="btn block" id="addgoal">${ico("pluscircle")}Add goal</button>`;
  $("#addgoal").onclick = () => openGoal();
  v.querySelectorAll("[data-gedit]").forEach(b => b.onclick = () => openGoal(b.dataset.gedit));
  v.querySelectorAll("[data-gadd]").forEach(b => b.onclick = () => openTxn({type: "transfer", to: S.data.goals[b.dataset.gadd].acct}));
  v.querySelectorAll("[data-gset]").forEach(b => b.onclick = () => openGoalSaved(b.dataset.gset));
}
function openGoal(id) {
  const g = id ? S.data.goals[id] : {name: "", target: 0, acct: "", by: ""};
  const assets = [["", "Update by hand", "edit"], ...accChips(a => kindOf(a) === "asset")];
  openSheet(id ? "Edit goal" : "New goal", `
  <label class="field"><span class="lbl">Goal name</span><input class="input" id="g-name" maxlength="40" value="${esc(g.name)}" placeholder="e.g. Emergency fund"></label>
  <div class="grid2"><label class="field"><span class="lbl">Target amount</span><input class="input num" id="g-target" inputmode="decimal" placeholder="0.00" value="${amtVal(g.target)}"></label>
  <label class="field"><span class="lbl">Target date</span><input class="input" type="date" id="g-by" value="${g.by || ""}"></label></div>
  <div class="field"><span class="lbl">Track with</span>${chipsHTML("gacct", assets, g.acct || "")}</div>
  <p class="hint" style="margin:0">Linking an account uses its balance as your progress. Tip: add a "Savings" account in Accounts and transfer into it.</p>
  <div class="err" id="g-err"></div>
  <button type="button" class="btn primary block" id="g-save">${ico("check")}${id ? "Save" : "Add goal"}</button>
  ${id ? `<button type="button" class="btn danger block" id="g-del">Delete goal</button>` : ""}`, root => {
    root.querySelector("#g-save").onclick = () => {
      const E = m => root.querySelector("#g-err").textContent = m;
      const name = root.querySelector("#g-name").value.trim(); if (!name) return E("Give the goal a name.");
      const t = readAmt(root, "#g-target", {required: true, label: "target amount"}); if (t.err) return E(t.err);
      const rec = {...g, name, target: t.v, acct: val(root, "gacct") || "", by: root.querySelector("#g-by").value || ""};
      S.data.goals[id || newId()] = rec; save(); closeSheet(); toast(id ? "Goal saved" : "Goal added");
    };
    const d = root.querySelector("#g-del"); if (d) armDelete(d, () => { closeSheet(); withUndo("Goal deleted", () => { delete S.data.goals[id]; }); });
  });
}
function openGoalSaved(id) {
  const g = S.data.goals[id];
  openSheet(g.name, `<label class="field"><span class="lbl">Saved so far</span><input class="input num" id="gs-amt" inputmode="decimal" placeholder="0.00" value="${amtVal(g.saved)}"></label>
  <div class="err" id="gs-err"></div><button type="button" class="btn primary block" id="gs-save">${ico("check")}Save</button>`, root => {
    root.querySelector("#gs-save").onclick = () => { const r = readAmt(root, "#gs-amt", {label: "amount"}); if (r.err) return root.querySelector("#gs-err").textContent = r.err; g.saved = r.v; save(); closeSheet(); toast("Updated"); };
  });
}

/* ---------- Recurring ---------- */
function renderRecurring(v) {
  const due = dueRecurring(); const rs = entries(S.data.recurring).sort((a, b) => a.name.localeCompare(b.name));
  v.innerHTML = `
  ${due.length ? `<section class="card"><div class="section-h"><h2>To confirm · ${due.length}</h2><span class="hint">Tap a row to change the amount</span></div>${dueHTML(due, 50)}</section>` : ""}
  <section class="card"><div class="section-h"><h2>Recurring entries</h2></div><div class="rows">
  ${rs.map(r => { const nx = nextOccurrence(r); return `<button type="button" class="row" data-rec="${r.id}"><span class="tile t-${r.type}">${ico(r.type === "transfer" ? "swap" : catIcon(r.cat))}</span><div class="main"><div class="t">${esc(r.name)}${r.paused ? ' <span class="pill">Paused</span>' : ""}</div><div class="s">${esc(freqLabel(r))}${nx && !r.paused ? " · next " + esc(dShort(nx)) : ""}</div></div><div class="a ${r.type === "income" ? "in" : r.type === "expense" ? "out" : ""}">${fmt(r.amt)}</div></button>`; }).join("")
    || `<p class="muted" style="margin:0">Nothing yet. Add your salary, allowance, subscriptions or regular bills, and they'll show up on Home to confirm with one tap.</p>`}
  </div></section>
  <div class="lbl">Quick start</div>
  <div class="chips">${[["Gov't salary", "income", "semimonthly"], ["Private work", "income", "monthly"], ["Parents' allowance", "income", "monthly"], ["Internet upstream", "expense", "monthly"], ["Subscriptions", "expense", "monthly"]].map(([c, t, f]) => `<button type="button" class="btnchip" data-tpl="${esc(c)}|${t}|${f}">${ico(catIcon(c))}${esc(c)}</button>`).join("")}</div>
  <button type="button" class="btn block" id="addrec">${ico("pluscircle")}Add recurring entry</button>`;
  wireDue(v);
  v.querySelectorAll("[data-rec]").forEach(b => b.onclick = () => openRecurring(b.dataset.rec));
  v.querySelectorAll("[data-tpl]").forEach(b => b.onclick = () => { const [cat, type, freq] = b.dataset.tpl.split("|"); openRecurring(null, {name: cat, cat, type, freq, biz: cat === "Internet upstream" ? "internet" : ""}); });
  $("#addrec").onclick = () => openRecurring();
}
function openRecurring(id, tpl) {
  const r = id ? S.data.recurring[id] : {name: "", type: "expense", amt: 0, cat: "", acct: "", to: "", biz: "", freq: "monthly", day: 1, days: [15, 30], wd: 1, start: today(), ...tpl};
  let type = r.type;
  openSheet(id ? "Edit recurring" : "New recurring", `
  <div class="seg" style="grid-template-columns:repeat(3,1fr)" role="group" aria-label="Type">${TYPES.slice(0, 3).map(([k, l, ic]) => `<button type="button" data-type="${k}" aria-pressed="${k === type}">${ico(ic)}${l}</button>`).join("")}</div>
  <div class="grid2"><label class="field"><span class="lbl">Name</span><input class="input" id="r-name" maxlength="40" value="${esc(r.name)}" placeholder="e.g. Netflix"></label>
  <label class="field"><span class="lbl">Amount</span><input class="input num" id="r-amt" inputmode="decimal" placeholder="0.00" value="${amtVal(r.amt)}"></label></div>
  <div id="r-dyn" class="stack" style="gap:16px"></div>
  <div class="field"><span class="lbl">How often</span><div class="seg2" role="group"><button type="button" data-freq="monthly">Monthly</button><button type="button" data-freq="semimonthly">Twice a month</button><button type="button" data-freq="weekly">Weekly</button></div></div>
  <div id="r-when" class="grid2"></div>
  <label class="field"><span class="lbl">Starting from</span><input class="input" type="date" id="r-start" value="${r.start || today()}"></label>
  ${id ? `<label class="check"><input type="checkbox" id="r-pause"${r.paused ? " checked" : ""}>Paused</label>` : ""}
  <div class="err" id="r-err"></div>
  <button type="button" class="btn primary block" id="r-save">${ico("check")}${id ? "Save" : "Add recurring"}</button>
  ${id ? `<button type="button" class="btn danger block" id="r-del">Delete</button>` : ""}`, root => {
    const dyn = root.querySelector("#r-dyn"); const sel = {cat: r.cat, acct: r.acct, to: r.to, biz: r.biz};
    let freq = r.freq;
    const capture = () => ["cat", "acct", "to", "biz"].forEach(k => { const x = val(dyn, k); if (x !== null) sel[k] = x; });
    const draw = () => {
      const all = accChips(() => true);
      if (type === "expense") dyn.innerHTML = `<div class="field"><span class="lbl">Category</span>${tilesHTML("cat", S.data.cats.expense.map(c => [c, c, catIcon(c)]), sel.cat)}</div><div class="field"><span class="lbl">For</span>${bizChips(sel.biz)}</div><div class="field"><span class="lbl">Paid with</span>${chipsHTML("acct", all, sel.acct)}</div>`;
      else if (type === "income") dyn.innerHTML = `<div class="field"><span class="lbl">Income stream</span>${tilesHTML("cat", S.data.cats.income.map(c => [c, c, catIcon(c)]), sel.cat)}</div><div class="field"><span class="lbl">Received in</span>${chipsHTML("acct", all, sel.acct)}</div>`;
      else dyn.innerHTML = `<div class="field"><span class="lbl">From</span>${chipsHTML("acct", all, sel.acct)}</div><div class="field"><span class="lbl">To</span>${chipsHTML("to", all, sel.to)}</div>`;
    };
    const drawWhen = () => {
      root.querySelectorAll("[data-freq]").forEach(b => b.setAttribute("aria-pressed", b.dataset.freq === freq));
      const w = root.querySelector("#r-when");
      if (freq === "monthly") w.innerHTML = `<label class="field"><span class="lbl">Day of month</span><input class="input num" type="number" min="1" max="31" id="r-day" value="${r.day || 1}"></label>`;
      else if (freq === "semimonthly") w.innerHTML = `<label class="field"><span class="lbl">First day</span><input class="input num" type="number" min="1" max="31" id="r-d1" value="${(r.days || [15, 30])[0]}"></label><label class="field"><span class="lbl">Second day</span><input class="input num" type="number" min="1" max="31" id="r-d2" value="${(r.days || [15, 30])[1]}"></label>`;
      else w.innerHTML = `<label class="field"><span class="lbl">Day of week</span><select class="select" id="r-wd">${WD.map((d, i) => `<option value="${i}"${i === (r.wd ?? 1) ? " selected" : ""}>${d}</option>`).join("")}</select></label>`;
    };
    draw(); drawWhen();
    root.querySelectorAll("[data-type]").forEach(b => b.onclick = () => { capture(); type = b.dataset.type; root.querySelectorAll("[data-type]").forEach(x => x.setAttribute("aria-pressed", x === b)); draw(); });
    root.querySelectorAll("[data-freq]").forEach(b => b.onclick = () => { freq = b.dataset.freq; drawWhen(); });
    const day = sel => Math.min(31, Math.max(1, parseInt(root.querySelector(sel)?.value, 10) || 1));
    root.querySelector("#r-save").onclick = () => {
      const E = m => root.querySelector("#r-err").textContent = m;
      const name = root.querySelector("#r-name").value.trim(); if (!name) return E("Give it a name.");
      const a = readAmt(root, "#r-amt", {required: true, label: "amount"}); if (a.err) return E(a.err);
      capture();
      const rec = {name, type, amt: a.v, freq, start: root.querySelector("#r-start").value || today(), acct: sel.acct || ""};
      if (!rec.acct) return E(type === "income" ? "Pick where you receive it." : "Pick an account.");
      if (type === "transfer") { rec.to = sel.to; if (!rec.to) return E("Pick the account it goes to."); if (rec.to === rec.acct) return E("From and To must be different accounts."); }
      else { rec.cat = sel.cat; if (!rec.cat) return E("Pick a category."); }
      if (type === "expense" && sel.biz) rec.biz = sel.biz;
      if (freq === "monthly") rec.day = day("#r-day"); else if (freq === "semimonthly") rec.days = [day("#r-d1"), day("#r-d2")].sort((x, y) => x - y); else rec.wd = +root.querySelector("#r-wd").value;
      const p = root.querySelector("#r-pause"); if (p?.checked) rec.paused = true;
      S.data.recurring[id || newId()] = rec; save(); closeSheet(); toast(id ? "Saved" : "Recurring added");
    };
    const d = root.querySelector("#r-del"); if (d) armDelete(d, () => { closeSheet(); withUndo("Recurring entry deleted", () => { delete S.data.recurring[id]; delete S.data.skips[id]; }); });
  });
}

/* ---------- Accounts ---------- */
function renderAccounts(v) {
  const {bal} = compute();
  const accs = accounts(true);
  const sect = (title, filter) => { const xs = accs.filter(filter); if (!xs.length) return "";
    return `<section class="card"><div class="section-h"><h2>${title}</h2><span class="muted num" style="font-size:13px">${fmt(xs.filter(a => !a.archived).reduce((s, a) => s + bal[a.id], 0))}</span></div><div class="rows">
    ${xs.map(a => `<button type="button" class="row" data-acc="${a.id}"><span class="tile ${kindOf(a) === "liability" ? "t-expense" : "t-transfer"}">${ico(GROUPS[a.group].icon)}</span><div class="main"><div class="t">${esc(a.name)}${a.archived ? ' <span class="pill">Hidden</span>' : ""}</div><div class="s">${esc(GROUPS[a.group].label)} · start ${fmt(a.opening || 0)}</div></div><div class="a">${fmt(bal[a.id])}</div></button>`).join("")}</div></section>`; };
  const cats = S.data.cats;
  const catBlock = (k, label) => `<div class="field"><span class="lbl">${label}</span><div class="chips">${cats[k].map((c, i) => `<span class="tag-x"><button type="button" class="link" style="display:inline-flex;align-items:center;gap:6px;color:var(--ink);font-weight:500;padding:0" data-edcat="${k}:${i}" aria-label="Rename ${esc(c)}">${ico(catIcon(c))}${esc(c)}</button><button type="button" aria-label="Remove ${esc(c)}" data-rmcat="${k}:${i}">×</button></span>`).join("")}</div>
    <form class="inline-add" data-addcat="${k}"><input class="input" id="newcat-${k}" placeholder="Add a category" maxlength="40"><button class="btn" type="submit">Add</button></form></div>`;
  v.innerHTML = `
  <div class="grid2"><button type="button" class="btn" id="startbal">${ico("sliders")}Starting balances</button><button type="button" class="btn" id="addacc">${ico("pluscircle")}Add account</button></div>
  ${sect("Cash, bank &amp; e-wallets", a => ["cash", "bank", "ewallet"].includes(a.group))}
  ${sect("Savings &amp; investments", a => a.group === "invest")}
  ${sect("Cards &amp; pay later", a => a.group === "card" || a.group === "bnpl")}
  ${sect("Loans I owe", a => a.group === "loan")}
  <section class="card stack" style="gap:16px"><div><h2 style="font-size:16px">Categories</h2><p class="hint" style="margin:4px 0 0">Tap a category to rename it or change its icon.</p></div>${catBlock("expense", "Expense categories")}${catBlock("income", "Income categories")}</section>`;
  v.querySelectorAll("[data-acc]").forEach(b => b.onclick = () => openAccount(b.dataset.acc));
  $("#addacc").onclick = () => openAccount();
  $("#startbal").onclick = openStartBalances;
  v.querySelectorAll("[data-rmcat]").forEach(b => b.onclick = () => { const [k, i] = b.dataset.rmcat.split(":"); const n = S.data.cats[k][+i]; withUndo(`Removed "${n}". Old entries keep it`, () => { S.data.cats[k].splice(+i, 1); }); });
  v.querySelectorAll("[data-edcat]").forEach(b => b.onclick = () => { const [k, i] = b.dataset.edcat.split(":"); openCategory(k, +i); });
  v.querySelectorAll("[data-addcat]").forEach(f => f.onsubmit = e => { e.preventDefault(); const k = f.dataset.addcat; const n = f.querySelector("input").value.trim(); if (n && !S.data.cats[k].includes(n)) { S.data.cats[k].push(n); save(); } });
}

/* ---------- Security & backup ---------- */
const LOCK_KEY = "raffy-ledger-lock";
const lockState = () => { try { return JSON.parse(localStorage.getItem(LOCK_KEY) || "null"); } catch { return null; } };
async function hashPin(pin, salt) { const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(salt + ":" + pin)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join(""); }
function renderSecurity(v) {
  const L = lockState(); const lb = S.data.lastBackup;
  v.innerHTML = `
  <section class="card stack" style="gap:12px">
    <div class="section-h" style="margin:0"><div class="cc-id"><span class="tile sm ${L ? "t-income" : "t-neutral"}">${ico("lock")}</span><h2>PIN lock</h2></div><span class="pill ${L ? "ok" : ""}">${L ? "On" : "Off"}</span></div>
    <p class="hint" style="margin:0">Asks for your PIN when the app opens or after a minute in the background. It keeps people out of the app; it doesn't encrypt the data on the phone.</p>
    <div class="actions">${L ? `<button type="button" class="btn" id="pin-change">${ico("edit")}Change PIN</button><button type="button" class="btn danger" id="pin-off">Turn off</button>` : `<button type="button" class="btn primary" id="pin-on">${ico("lock")}Set a PIN</button>`}</div>
  </section>
  <section class="card stack" style="gap:12px">
    <div class="section-h" style="margin:0"><div class="cc-id"><span class="tile sm t-transfer">${ico("down")}</span><h2>Backup</h2></div><span class="hint">${lb ? "Last: " + esc(dShort(lb)) : "Never"}</span></div>
    <p class="hint" style="margin:0">Everything is stored only on this phone. Export a backup now and then and keep it in Google Drive or Messenger to yourself. If you change phones, import it there.</p>
    <div class="actions"><button type="button" class="btn primary" id="exportjson">${ico("down")}Export backup</button><button type="button" class="btn" id="importbtn">${ico("up")}Import</button><button type="button" class="btn" id="exportcsv">${ico("table")}CSV</button></div>
    <div id="importconfirm"></div>
  </section>`;
  const on = $("#pin-on"); if (on) on.onclick = () => pinSetup(null);
  const ch = $("#pin-change"); if (ch) ch.onclick = () => pinVerifySheet("Enter current PIN", () => pinSetup(L));
  const off = $("#pin-off"); if (off) off.onclick = () => pinVerifySheet("Enter PIN to turn off", () => { try { localStorage.removeItem(LOCK_KEY); } catch {} closeSheet(); render(); toast("PIN lock off"); });
  $("#exportjson").onclick = () => { S.data.lastBackup = today(); download(`ledger-backup-${today()}.json`, JSON.stringify({app: "raffy-ledger", version: 2, exported: new Date().toISOString(), data: S.data}), "application/json"); save(); toast("Backup saved to Downloads"); };
  $("#exportcsv").onclick = exportCSV;
  $("#importbtn").onclick = () => $("#importfile").click();
}
function keypadHTML(extra) { return `<div class="keypad">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<button type="button" data-k="${n}">${n}</button>`).join("")}${extra || `<span></span>`}<button type="button" data-k="0">0</button><button type="button" class="ghost" data-k="del" aria-label="Delete">${ico("back")}</button></div>`; }
function wireKeypad(root, len, dotsEl, onDone) {
  let buf = "";
  const draw = () => dotsEl.innerHTML = Array.from({length: len}, (_, i) => `<i class="${i < buf.length ? "on" : ""}"></i>`).join("");
  const press = k => { if (k === "del") buf = buf.slice(0, -1); else if (buf.length < len) buf += k; draw(); if (buf.length === len) { const b = buf; buf = ""; setTimeout(() => { draw(); onDone(b); }, 120); } };
  root.querySelectorAll("[data-k]").forEach(b => b.onclick = () => press(b.dataset.k));
  draw();
  return {shake() { dotsEl.classList.remove("shake"); void dotsEl.offsetWidth; dotsEl.classList.add("shake"); }};
}
function pinSetup() {
  let len = 4, first = null;
  openSheet("Set a PIN", `<div class="seg2" role="group"><button type="button" data-len="4" aria-pressed="true">4 digits</button><button type="button" data-len="6" aria-pressed="false">6 digits</button></div>
    <p class="hint" id="pin-msg" style="margin:0;text-align:center">Enter a new PIN</p><div class="pdots" id="pin-dots" style="justify-content:center"></div><div style="display:flex;justify-content:center">${keypadHTML()}</div>`, root => {
    const msg = root.querySelector("#pin-msg"), dots = root.querySelector("#pin-dots");
    let kp;
    const start = () => { first = null; msg.textContent = "Enter a new PIN"; kp = wireKeypad(root, len, dots, async pin => {
      if (!first) { first = pin; msg.textContent = "Enter it again to confirm"; return; }
      if (pin !== first) { kp.shake(); toast("PINs didn't match. Try again.", true); start(); return; }
      const salt = newId(); try { localStorage.setItem(LOCK_KEY, JSON.stringify({salt, hash: await hashPin(pin, salt), len})); } catch { return toast("Couldn't save the PIN on this phone.", true); }
      sessionUnlocked = true; closeSheet(); render(); toast("PIN lock on");
    }); };
    root.querySelectorAll("[data-len]").forEach(b => b.onclick = () => { len = +b.dataset.len; root.querySelectorAll("[data-len]").forEach(x => x.setAttribute("aria-pressed", x === b)); start(); });
    start();
  });
}
function pinVerifySheet(title, ok) {
  const L = lockState(); if (!L) return ok();
  openSheet(title, `<div class="pdots" id="pv-dots" style="justify-content:center"></div><div style="display:flex;justify-content:center">${keypadHTML()}</div>`, root => {
    const kp = wireKeypad(root, L.len, root.querySelector("#pv-dots"), async pin => { if (await hashPin(pin, L.salt) === L.hash) ok(); else { kp.shake(); toast("Wrong PIN", true); } });
  });
}
let sessionUnlocked = false, hiddenAt = 0, fails = 0, coolUntil = 0;
function showLock() {
  const L = lockState(); if (!L) { sessionUnlocked = true; return; }
  sessionUnlocked = false; closeSheet();
  const r = $("#lock-root");
  r.innerHTML = `<div class="lock" role="dialog" aria-modal="true" aria-label="Unlock"><span class="tile">${ico("lock")}</span><h2>Raffy's Ledger</h2><p class="hint" id="lk-msg" style="margin:-10px 0 0">Enter your PIN</p><div class="pdots" id="lk-dots"></div>${keypadHTML(`<button type="button" class="ghost" id="lk-forgot">Forgot</button>`)}</div>`;
  const msg = r.querySelector("#lk-msg");
  const kp = wireKeypad(r, L.len, r.querySelector("#lk-dots"), async pin => {
    if (Date.now() < coolUntil) { msg.textContent = `Too many tries. Wait ${Math.ceil((coolUntil - Date.now()) / 1000)}s.`; return; }
    if (await hashPin(pin, L.salt) === L.hash) { fails = 0; sessionUnlocked = true; r.innerHTML = ""; render(); return; }
    kp.shake(); fails++; msg.textContent = fails >= 5 ? "Too many tries. Wait 30 seconds." : "Wrong PIN, try again";
    if (fails >= 5) { coolUntil = Date.now() + 30000; fails = 0; }
  });
  r.querySelector("#lk-forgot").onclick = () => {
    msg.innerHTML = `A forgotten PIN can't be recovered. You can erase everything on this phone and restore from your backup file. <button type="button" class="link" id="lk-erase">Erase and start over</button>`;
    let armed = false; r.querySelector("#lk-erase").onclick = e => { if (!armed) { armed = true; e.target.textContent = "Tap again to erase all data"; return; } try { localStorage.removeItem(KEY); localStorage.removeItem(LOCK_KEY); } catch {} S.data = null; sessionUnlocked = true; r.innerHTML = ""; render(); };
  };
}
document.addEventListener("visibilitychange", () => { if (document.hidden) hiddenAt = Date.now(); else if (lockState() && sessionUnlocked && hiddenAt && Date.now() - hiddenAt > 60000) showLock(); });

$("#importfile").onchange = async e => {
  const f = e.target.files[0]; e.target.value = ""; if (!f) return;
  let parsed; try { parsed = JSON.parse(await f.text()); } catch { return toast("That file isn't a ledger backup.", true); }
  const d = parsed?.data; if (!d || typeof d !== "object" || !d.accounts) return toast("That file isn't a ledger backup.", true);
  const box = $("#importconfirm"); if (!box) return;
  box.innerHTML = `<div class="banner warn" style="flex-wrap:wrap"><span>Replace everything on this phone with this backup (${Object.keys(d.txns || {}).length} entries${parsed.exported ? ", from " + esc(dShort(parsed.exported.slice(0, 10))) : ""})?</span><div class="actions"><button type="button" class="btn danger" id="doimport">Replace</button><button type="button" class="btn" id="noimport">Cancel</button></div></div>`;
  $("#noimport").onclick = () => box.innerHTML = "";
  $("#doimport").onclick = () => { S.data = normalize(d)[0]; save(); toast("Backup restored"); };
};
function exportCSV() {
  const q = s => `"${String(s ?? "").replace(/"/g, '""')}"`;
  const lines = [["Date", "Type", "Category", "Business", "Account", "To account", "Person", "Amount", "Note"].join(",")];
  allTxns().sort((a, b) => a.date.localeCompare(b.date)).forEach(t => { const b = txnBiz(t); lines.push([t.date, t.type, q(t.cat), q(b ? BIZ[b].label : ""), q(t.acct ? accName(t.acct) : ""), q(t.to ? accName(t.to) : ""), q(t.person ? pName(t.person) : ""), (t.amt / 100).toFixed(2), q(t.note)].join(",")); });
  download(`ledger-${today()}.csv`, lines.join("\n"), "text/csv"); toast("CSV saved to Downloads");
}

/* ---------- setup ---------- */
function renderSetup(v) {
  $("#title").textContent = "Set up";
  v.innerHTML = `
  <section class="card stack" style="gap:14px">
    <div><h2 style="font-size:19px">Set up your books</h2><p class="muted" style="margin:6px 0 0">Enter what each account holds today. For cards and SPayLater, enter what you currently owe. Leave blank if zero. You can change any of these later in More → Accounts → Starting balances.</p></div>
    ${DEFAULT_ACCOUNTS.map(([id, name, g]) => `<div class="setup-row"><span class="tile sm ${GROUPS[g].kind === "liability" ? "t-expense" : "t-transfer"}">${ico(GROUPS[g].icon)}</span><input class="input" id="sn-${id}" value="${esc(name)}" aria-label="Account name"><input class="input num" id="so-${id}" inputmode="decimal" placeholder="${GROUPS[g].kind === "liability" ? "Owed 0.00" : "0.00"}" aria-label="${esc(name)} balance"></div>`).join("")}
    <div class="err" id="setup-err"></div>
    <button type="button" class="btn primary block" id="setup-go">${ico("check")}Create my books</button>
    <button type="button" class="btn block" id="setup-import">${ico("up")}Restore from a backup instead</button>
  </section>
  <div id="importconfirm"></div>`;
  $("#setup-import").onclick = () => $("#importfile").click();
  $("#setup-go").onclick = () => {
    const accs = {}; let bad = false;
    DEFAULT_ACCOUNTS.forEach(([id, name, g], i) => {
      const raw = $("#so-" + id).value.trim(); const amt = raw ? parseAmt(raw) : 0;
      if (raw && amt == null && !isZeroish(raw)) bad = true;
      accs[id] = {name: $("#sn-" + id).value.trim() || name, group: g, opening: amt || 0, order: i};
    });
    if (bad) { $("#setup-err").textContent = "One of the balances isn't a number. Use digits like 12,500.00."; return; }
    S.data = normalize({accounts: accs, people: {}, cats: clone(DEFAULT_CATS), txns: {}, created: today(), ver: 2})[0];
    save(); toast("Books created");
  };
}

/* ================= sheets ================= */
function openTxn(o = {}) {
  const e = o.edit, pf = o.prefill || {};
  let type = e ? (e.type === "ar_collect" ? "collect" : e.type) : (o.type || pref.get("lastType", "expense"));
  const last = pref.get("lastAcct", {});
  const html = `
  <div class="seg" role="group" aria-label="Type">${TYPES.map(([k, l, ic]) => `<button type="button" data-type="${k}" aria-pressed="${k === type}">${ico(ic)}${l}</button>`).join("")}</div>
  <div class="amt-wrap"><span>₱</span><input class="amt-input" id="f-amt" inputmode="decimal" autocomplete="off" placeholder="0.00" value="${amtVal(e?.amt || o.amt || pf.amt)}" aria-label="Amount"></div>
  <div id="f-dyn" class="stack" style="gap:16px"></div>
  <div class="grid2"><label class="field"><span class="lbl">Date</span><input class="input" type="date" id="f-date" value="${e?.date || pf.date || today()}"></label>
    <label class="field"><span class="lbl">Note</span><input class="input" id="f-note" maxlength="80" placeholder="Optional" value="${esc(e?.note || pf.note || "")}"></label></div>
  <div class="err" id="f-err" role="alert"></div>
  <button type="button" class="btn primary block" id="f-save">${ico("check")}${e ? "Save changes" : "Save"}</button>
  ${e ? `<button type="button" class="btn danger block" id="f-del">Delete</button>` : ""}`;
  openSheet(e ? "Edit entry" : o.rid ? "Confirm entry" : "New entry", html, root => {
    const sel = {cat: e?.cat || pf.cat, acct: e?.acct || pf.acct, to: e?.to || o.to || pf.to, person: e?.person || o.person, biz: e?.biz ?? pf.biz ?? ""};
    const dyn = root.querySelector("#f-dyn");
    const capture = () => ["cat", "acct", "to", "person", "biz"].forEach(k => { const x = val(dyn, k); if (x !== null) sel[k] = x; });
    function drawInterest() {
      const box = dyn.querySelector("#f-int"); if (!box) return;
      const to = val(dyn, "to") || sel.to; const loan = S.data.accounts[to]?.group === "loan";
      box.hidden = !loan || !!e;
    }
    function draw() {
      const all = accChips(() => true), assets = accChips(a => kindOf(a) === "asset");
      if (type === "expense") dyn.innerHTML = `<div class="field"><span class="lbl">Category</span>${tilesHTML("cat", S.data.cats.expense.map(c => [c, c, catIcon(c)]), sel.cat)}</div><div class="field"><span class="lbl">For</span>${bizChips(sel.biz)}</div><div class="field"><span class="lbl">Paid with</span>${chipsHTML("acct", all, sel.acct || last.expense)}</div>`;
      else if (type === "income") dyn.innerHTML = `<div class="field"><span class="lbl">Income stream</span>${tilesHTML("cat", S.data.cats.income.map(c => [c, c, catIcon(c)]), sel.cat)}</div><div class="field"><span class="lbl">Received in</span>${chipsHTML("acct", all, sel.acct || last.income)}</div>`;
      else if (type === "transfer") {
        dyn.innerHTML = `<div class="field"><span class="lbl">From</span>${chipsHTML("acct", all, sel.acct || last.transfer)}</div><div class="field"><span class="lbl">To</span>${chipsHTML("to", all, sel.to)}</div>
        <label class="field" id="f-int" hidden><span class="lbl">Interest part of this payment</span><input class="input num" id="f-intamt" inputmode="decimal" placeholder="0.00 (optional)"><span class="hint">Logged as an Interest &amp; fees expense. The rest reduces the loan.</span></label>
        <p class="hint" style="margin:0">Paying a card, SPayLater or loan? From your bank, to it. Saving toward a goal or putting money into Pickle Jar? To that account.</p>`;
        dyn.querySelectorAll('input[name="to"]').forEach(r => r.onchange = drawInterest); drawInterest();
      }
      else if (type === "collect") { const ps = people().map(p => [p.id, p.name, KINDS[p.kind].icon]);
        dyn.innerHTML = ps.length ? `<div class="field"><span class="lbl">Who paid you</span>${chipsHTML("person", ps, sel.person)}</div><div class="field"><span class="lbl">Deposited to</span>${chipsHTML("acct", assets, sel.acct || last.collect)}</div>` : `<p class="hint" style="margin:0">Add people in the "Owed to me" tab first.</p>`; }
    }
    draw();
    root.querySelectorAll("[data-type]").forEach(b => b.onclick = () => { capture(); type = b.dataset.type; root.querySelectorAll("[data-type]").forEach(x => x.setAttribute("aria-pressed", x === b)); root.querySelector("#f-err").textContent = ""; draw(); });
    const amtI = root.querySelector("#f-amt"); if (!e && !o.amt && !pf.amt) setTimeout(() => amtI.focus(), 60);
    root.querySelector("#f-save").onclick = () => {
      const err = m => root.querySelector("#f-err").textContent = m;
      const amt = parseAmt(amtI.value); if (!amt) return err("Enter an amount greater than zero.");
      const date = root.querySelector("#f-date").value; if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return err("Pick a date.");
      const note = root.querySelector("#f-note").value.trim(); const g = k => val(dyn, k);
      const t = {id: e?.id || newId(), amt, date, at: e?.at || Date.now()}; if (note) t.note = note;
      if (e?.rid) { t.rid = e.rid; t.rdate = e.rdate; } else if (o.rid) { t.rid = o.rid; t.rdate = o.rdate; }
      if (e?.pairTo) t.pairTo = e.pairTo;
      let extra = null;
      if (type === "expense" || type === "income") { t.type = type; t.cat = g("cat"); t.acct = g("acct"); if (!t.cat) return err("Pick a category."); if (!t.acct) return err("Pick an account."); if (type === "expense" && g("biz")) t.biz = g("biz"); }
      else if (type === "transfer") {
        t.type = "transfer"; t.acct = g("acct"); t.to = g("to"); if (!t.acct || !t.to) return err("Pick both accounts."); if (t.acct === t.to) return err("From and To must be different accounts.");
        const ib = dyn.querySelector("#f-int");
        if (ib && !ib.hidden) { const r = readAmt(dyn, "#f-intamt", {label: "interest"}); if (r.err) return err(r.err);
          if (r.v) { if (r.v >= amt) return err("Interest must be less than the total payment."); t.amt = amt - r.v; if (!S.data.cats.expense.includes("Interest & fees")) S.data.cats.expense.push("Interest & fees"); extra = {id: newId(), type: "expense", cat: "Interest & fees", acct: t.acct, amt: r.v, date, at: Date.now() + 1, pairTo: t.to, note: "Interest · " + accName(t.to)}; } }
      }
      else if (type === "collect") { t.type = "ar_collect"; t.person = g("person"); t.acct = g("acct"); if (!t.person) return err("Pick who paid you."); if (!t.acct) return err("Pick where you deposited it."); }
      if (!e) { pref.set("lastType", type); const la = pref.get("lastAcct", {}); la[type] = t.acct; pref.set("lastAcct", la); }
      const before = t.type === "expense" ? (budgetUse(t.cat, mKey(t.date))?.spent || 0) - (e && e.type === "expense" && e.cat === t.cat && mKey(e.date) === mKey(t.date) ? e.amt : 0) : 0;
      if (extra) { const {id, ...body} = extra; S.data.txns[id] = body; }
      putTxn(t); closeSheet(); toast(e ? "Saved" : o.rid ? "Logged" : "Added"); budgetNudge(t, before);
    };
    const del = root.querySelector("#f-del");
    if (del) armDelete(del, () => { closeSheet(); delTxn(e.id); });
  });
}
function openCharge(pid, edit) {
  const p = S.data.people[pid]; const loan = p.kind === "loan";
  const last = pref.get("lastAcct", {});
  openSheet(edit ? "Edit charge" : (loan ? "Lend to " : "Charge ") + p.name, `
  <div class="amt-wrap"><span>₱</span><input class="amt-input" id="c-amt" inputmode="decimal" placeholder="0.00" value="${amtVal(edit?.amt || (!loan && p.monthly) || 0)}" aria-label="Amount"></div>
  ${loan ? `<div class="field"><span class="lbl">Lent from</span>${chipsHTML("acct", accChips(a => kindOf(a) === "asset"), edit?.acct || last.lend)}</div>` : `<p class="hint" style="margin:0">Counts as ${esc(KINDS[p.kind].income)} income on this date and adds to what ${esc(p.name)} owes you.</p>`}
  <div class="grid2"><label class="field"><span class="lbl">Date</span><input class="input" type="date" id="c-date" value="${edit?.date || today()}"></label>
    <label class="field"><span class="lbl">Note</span><input class="input" id="c-note" maxlength="80" placeholder="Optional" value="${esc(edit?.note || "")}"></label></div>
  <div class="err" id="c-err"></div>
  <button type="button" class="btn primary block" id="c-save">${ico("check")}${edit ? "Save changes" : "Save"}</button>
  ${edit ? `<button type="button" class="btn danger block" id="c-del">Delete</button>` : ""}`, root => {
    root.querySelector("#c-save").onclick = () => {
      const err = m => root.querySelector("#c-err").textContent = m;
      const amt = parseAmt(root.querySelector("#c-amt").value); if (!amt) return err("Enter an amount greater than zero.");
      const date = root.querySelector("#c-date").value; if (!date) return err("Pick a date.");
      const t = {id: edit?.id || newId(), type: "ar_charge", person: pid, amt, date, at: edit?.at || Date.now()};
      if (edit?.period) t.period = edit.period;
      const note = root.querySelector("#c-note").value.trim(); if (note) t.note = note;
      if (loan) { t.acct = val(root, "acct"); if (!t.acct) return err("Pick the account the money came from."); const la = pref.get("lastAcct", {}); la.lend = t.acct; pref.set("lastAcct", la); }
      putTxn(t); closeSheet(); toast(edit ? "Saved" : loan ? "Loan recorded" : "Charged");
    };
    const del = root.querySelector("#c-del"); if (del) armDelete(del, () => { closeSheet(); delTxn(edit.id); });
  });
}
function openPlan(id) {
  const pl = id ? S.data.plans[id] : {name: "", acct: "", total: 0, months: 12, monthly: 0, start: mKey(today())};
  const libs = accChips(a => a.group === "card" || a.group === "bnpl");
  openSheet(id ? "Edit installment" : "New installment plan", `
  <label class="field"><span class="lbl">What you bought</span><input class="input" id="pl-name" maxlength="40" value="${esc(pl.name)}" placeholder="e.g. Phone, stroller"></label>
  <div class="field"><span class="lbl">Charged to</span>${libs.length ? chipsHTML("pacct", libs, pl.acct) : `<p class="hint" style="margin:0">Add a credit card or pay-later account first.</p>`}</div>
  <div class="grid2">
    <label class="field"><span class="lbl">Total price</span><input class="input num" id="pl-total" inputmode="decimal" placeholder="0.00" value="${amtVal(pl.total)}"></label>
    <label class="field"><span class="lbl">Months</span><input class="input num" id="pl-months" type="number" min="1" max="60" value="${pl.months}"></label>
    <label class="field"><span class="lbl">Monthly amount</span><input class="input num" id="pl-monthly" inputmode="decimal" placeholder="Auto" value="${amtVal(pl.monthly)}"></label>
    <label class="field"><span class="lbl">First billed</span><input class="input" type="month" id="pl-start" value="${pl.start}"></label>
  </div>
  <p class="hint" style="margin:0">Leave monthly amount blank to split the total evenly. Fill it in if the plan adds interest or fees.</p>
  ${id ? "" : `<label class="check"><input type="checkbox" id="pl-log" checked>Also log the full purchase as an expense today</label><div id="pl-cat" class="stack" style="gap:16px"><div class="field"><span class="lbl">Category</span>${tilesHTML("pcat", S.data.cats.expense.map(c => [c, c, catIcon(c)]), "Shopping")}</div><div class="field"><span class="lbl">For</span>${bizChips("")}</div></div>`}
  <div class="err" id="pl-err"></div>
  <button type="button" class="btn primary block" id="pl-save">${ico("check")}${id ? "Save" : "Add plan"}</button>
  ${id ? `<button type="button" class="btn danger block" id="pl-del">Delete plan</button><p class="hint" style="margin:0">Deleting the plan keeps the purchase expense in Activity. Delete that entry separately if you don't want it.</p>` : ""}`, root => {
    const lg = root.querySelector("#pl-log"); if (lg) lg.onchange = () => root.querySelector("#pl-cat").hidden = !lg.checked;
    root.querySelector("#pl-save").onclick = () => {
      const E = m => root.querySelector("#pl-err").textContent = m;
      const name = root.querySelector("#pl-name").value.trim(); if (!name) return E("Say what you bought.");
      const acct = val(root, "pacct"); if (!acct) return E("Pick the card or pay-later account.");
      const tt = readAmt(root, "#pl-total", {required: true, label: "total price"}); if (tt.err) return E(tt.err);
      const months = Math.min(60, Math.max(1, parseInt(root.querySelector("#pl-months").value, 10) || 0)); if (!months) return E("Enter the number of months.");
      const mo = readAmt(root, "#pl-monthly", {label: "monthly amount"}); if (mo.err) return E(mo.err);
      const start = root.querySelector("#pl-start").value || mKey(today());
      const rec = {name, acct, total: tt.v, months, monthly: mo.v || Math.round(tt.v / months), start};
      const pid = id || newId(); S.data.plans[pid] = rec;
      if (lg?.checked) { const cat = val(root, "pcat") || "Shopping"; const b = val(root, "biz"); const t = {type: "expense", cat, acct, amt: tt.v, date: today(), at: Date.now(), note: name + " (installment)", plan: pid}; if (b) t.biz = b; S.data.txns[newId()] = t; }
      save(); closeSheet(); toast(id ? "Plan saved" : "Installment added");
    };
    const d = root.querySelector("#pl-del"); if (d) armDelete(d, () => { closeSheet(); withUndo("Plan deleted. Its purchase entry stays in Activity", () => { delete S.data.plans[id]; }); });
  });
}
const ICON_CHOICES = ["cart","food","baby","fuel","bolt","home","bag","health","user","users","repeat","gift","percent","bank","briefcase","wifi","router","key","cash","phone","card","trend","piggy","target","wrench","box","pulse","bill","loan","coins","layers","calendar","tag","dots"];
function openCategory(k, i) {
  const old = S.data.cats[k][i];
  openSheet("Edit category", `
  <label class="field"><span class="lbl">Name</span><input class="input" id="cat-name" maxlength="40" value="${esc(old)}"></label>
  <div class="field"><span class="lbl">Icon</span><div class="tiles" role="radiogroup" style="grid-template-columns:repeat(6,minmax(0,1fr))">${ICON_CHOICES.map(n => `<label class="tpick"><input type="radio" name="cicon" value="${n}"${n === catIcon(old) ? " checked" : ""}><span style="min-height:48px">${ico(n)}</span></label>`).join("")}</div></div>
  <p class="hint" style="margin:0">Renaming updates your past entries, budgets and recurring items too.</p>
  <div class="err" id="cat-err"></div>
  <button type="button" class="btn primary block" id="cat-save">${ico("check")}Save</button>`, root => {
    root.querySelector("#cat-save").onclick = () => {
      const nn = root.querySelector("#cat-name").value.trim(); if (!nn) return root.querySelector("#cat-err").textContent = "Give the category a name.";
      const d = S.data; if (nn !== old && d.cats[k].includes(nn)) return root.querySelector("#cat-err").textContent = "You already have a category with that name.";
      const icon = val(root, "cicon");
      if (nn !== old) {
        d.cats[k][i] = nn;
        Object.values(d.txns).forEach(t => { if (t.cat === old && t.type === k) t.cat = nn; });
        Object.values(d.recurring).forEach(r => { if (r.cat === old && r.type === k) r.cat = nn; });
        if (k === "expense" && d.budgets[old] != null) { d.budgets[nn] = d.budgets[old]; delete d.budgets[old]; }
        if (k === "income") { const b = (d.incomeBiz || {})[old] || (old === "Internet business" ? "internet" : /rent/i.test(old) ? "rental" : null); if (b) { d.incomeBiz = d.incomeBiz || {}; d.incomeBiz[nn] = b; delete d.incomeBiz[old]; } }
        if (d.catIcons?.[old]) { d.catIcons[nn] = d.catIcons[old]; delete d.catIcons[old]; }
      }
      if (icon) { d.catIcons = d.catIcons || {}; d.catIcons[nn] = icon; }
      save(); closeSheet(); toast(nn !== old ? `Renamed to ${nn}` : "Saved");
    };
  });
}
function openStartBalances() {
  const accs = accounts(true), ps = people(true);
  const row = (attr, id, icon, cls, name, sub, v) => `<label class="sb-row"><span class="tile sm ${cls}">${ico(icon)}</span><span class="sb-name">${esc(name)}<small>${sub}</small></span><input class="input num" ${attr}="${id}" inputmode="decimal" placeholder="0.00" value="${amtVal(v)}" aria-label="${esc(name)} starting amount"></label>`;
  openSheet("Starting balances", `
  <p class="hint" style="margin:0">What each account held when you started tracking. For cards, pay later and loans, what you owed. Changing a starting balance shifts its current balance by the same amount; your entries stay as they are.</p>
  <div class="lbl">Accounts</div>
  <div class="sb-list">${accs.map(a => row("data-sba", a.id, GROUPS[a.group].icon, kindOf(a) === "liability" ? "t-expense" : "t-transfer", a.name, kindOf(a) === "liability" ? "Owed at start" : "Held at start", a.opening)).join("")}</div>
  ${ps.length ? `<div class="lbl">Already owed to you at start</div><div class="sb-list">${ps.map(p => row("data-sbp", p.id, KINDS[p.kind].icon, "t-ar_charge", p.name, KINDS[p.kind].label, p.opening)).join("")}</div>` : ""}
  <div class="err" id="sb-err"></div>
  <button type="button" class="btn primary block" id="sb-save">${ico("check")}Save balances</button>`, root => {
    root.querySelector("#sb-save").onclick = () => {
      let bad = null; const A = {}, Pp = {};
      const read = (sel, out) => root.querySelectorAll(`[${sel}]`).forEach(i => { const r = i.value.trim(); const v = r ? parseAmt(r) : 0; if (r && v == null && !isZeroish(r)) bad = bad || i; out[i.getAttribute(sel)] = v || 0; });
      read("data-sba", A); read("data-sbp", Pp);
      if (bad) { root.querySelector("#sb-err").textContent = "One of the amounts isn't a number. Use digits like 12,500.00."; bad.focus(); return; }
      for (const k in A) if (S.data.accounts[k]) S.data.accounts[k].opening = A[k];
      for (const k in Pp) if (S.data.people[k]) S.data.people[k].opening = Pp[k];
      save(); closeSheet(); toast("Starting balances updated");
    };
  });
}
function balanceAsOf(id, date) {
  const a = S.data.accounts[id]; let b = a.opening || 0; const sg = kindOf(a) === "liability" ? -1 : 1;
  for (const t of allTxns()) { if (t.date > date) continue;
    if (t.type === "expense" && t.acct === id) b -= sg * t.amt; else if (t.type === "income" && t.acct === id) b += sg * t.amt;
    else if (t.type === "transfer") { if (t.acct === id) b -= sg * t.amt; if (t.to === id) b += sg * t.amt; }
    else if ((t.type === "ar_collect") && t.acct === id) b += sg * t.amt; else if (t.type === "ar_charge" && t.acct === id) b -= sg * t.amt; }
  return b;
}
function suggestStatement(a) {
  if (!a.cutDay) return null;
  const t = today(); let mk = mKey(t); let cut = `${mk}-${pad(Math.min(a.cutDay, lastDay(mk)))}`;
  if (cut > t) { mk = mShift(mk, -1); cut = `${mk}-${pad(Math.min(a.cutDay, lastDay(mk)))}`; }
  let due = null;
  if (a.payDay) { let dm = a.payDay > a.cutDay ? mk : mShift(mk, 1); due = `${dm}-${pad(Math.min(a.payDay, lastDay(dm)))}`; }
  return {date: cut, due, bal: Math.max(0, balanceAsOf(a.id, cut))};
}
function openStatement(id) {
  const a = S.data.accounts[id]; const sug = suggestStatement({...a, id}); const fresh = sug && (!a.stmt || a.stmt.date < sug.date);
  const s = fresh ? {date: sug.date, due: sug.due, bal: sug.bal, min: 0} : (a.stmt || {});
  openSheet(a.name + " statement", `
  <div class="grid2">
    <label class="field"><span class="lbl">Statement date</span><input class="input" type="date" id="s-date" value="${s.date || today()}"></label>
    <label class="field"><span class="lbl">Payment due</span><input class="input" type="date" id="s-due" value="${s.due || ""}"></label>
    <label class="field"><span class="lbl">Statement balance</span><input class="input num" id="s-bal" inputmode="decimal" placeholder="0.00" value="${amtVal(s.bal)}"></label>
    <label class="field"><span class="lbl">Minimum due</span><input class="input num" id="s-min" inputmode="decimal" placeholder="0.00" value="${amtVal(s.min)}"></label>
  </div>
  <p class="hint" style="margin:0">${fresh ? `Pre-filled from your entries up to the ${esc(dShort(sug.date))} cut-off. Check it against your bill and fill in the minimum due.` : a.cutDay ? "" : "Tip: set this card's cut-off and due day in its account settings and statements will pre-fill."} Payments you log from the statement date onward count toward this bill.</p>
  <div class="err" id="s-err"></div>
  <button type="button" class="btn primary block" id="s-save">${ico("check")}Save statement</button>`, root => {
    root.querySelector("#s-save").onclick = () => {
      const E = m => root.querySelector("#s-err").textContent = m;
      const date = root.querySelector("#s-date").value, due = root.querySelector("#s-due").value;
      if (!date || !due) return E("Enter both the statement date and the due date.");
      const b = readAmt(root, "#s-bal", {required: true, label: "statement balance"}); if (b.err) return E(b.err);
      const m = readAmt(root, "#s-min", {label: "minimum due"}); if (m.err) return E(m.err);
      a.stmt = {date, due, bal: b.v, min: m.v}; save(); closeSheet(); toast("Statement saved");
    };
  });
}
function openAccount(id, groupDefault) {
  const a = id ? S.data.accounts[id] : {name: "", group: groupDefault || "bank", opening: 0};
  openSheet(id ? "Edit account" : groupDefault === "loan" ? "New loan I owe" : "New account", `
  <label class="field"><span class="lbl">Name</span><input class="input" id="a-name" maxlength="40" value="${esc(a.name)}" placeholder="${groupDefault === "loan" ? "e.g. GSIS salary loan" : "e.g. BPI savings"}"></label>
  <div class="field"><span class="lbl">Type</span>${tilesHTML("grp", Object.entries(GROUPS).map(([k, g]) => [k, g.label, g.icon]), a.group)}</div>
  <div class="grid2">
    <label class="field"><span class="lbl" id="a-open-l">Starting balance</span><input class="input num" id="a-open" inputmode="decimal" placeholder="0.00" value="${amtVal(a.opening)}"></label>
    <label class="field" id="a-limit-f"><span class="lbl">Credit limit</span><input class="input num" id="a-limit" inputmode="decimal" placeholder="Optional" value="${amtVal(a.limit)}"></label>
  </div>
  <div class="grid2" id="a-card-f">
    <label class="field"><span class="lbl">Statement cut-off day</span><input class="input num" id="a-cut" type="number" min="1" max="31" placeholder="e.g. 5" value="${a.cutDay || ""}"></label>
    <label class="field"><span class="lbl">Payment due day</span><input class="input num" id="a-pay" type="number" min="1" max="31" placeholder="e.g. 25" value="${a.payDay || ""}"></label>
  </div>
  <div class="grid2" id="a-loan-f">
    <label class="field"><span class="lbl">Monthly amortization</span><input class="input num" id="a-monthly" inputmode="decimal" placeholder="0.00" value="${amtVal(a.monthly)}"></label>
    <label class="field"><span class="lbl">Due day</span><input class="input num" id="a-day" type="number" min="1" max="31" value="${a.dueDay || 1}"></label>
  </div>
  ${id ? `<label class="check"><input type="checkbox" id="a-arch"${a.archived ? " checked" : ""}>Hide this account</label>` : ""}
  <p class="hint" style="margin:0" id="a-hint"></p>
  <div class="err" id="a-err"></div>
  <button type="button" class="btn primary block" id="a-save">${ico("check")}${id ? "Save" : "Add"}</button>`, root => {
    const grp = () => val(root, "grp") || "bank";
    const sync = () => { const g = grp(), lib = GROUPS[g].kind === "liability";
      root.querySelector("#a-limit-f").hidden = !(g === "card" || g === "bnpl"); root.querySelector("#a-card-f").hidden = !(g === "card" || g === "bnpl"); root.querySelector("#a-loan-f").hidden = g !== "loan";
      root.querySelector("#a-open-l").textContent = g === "loan" ? "Balance at start" : lib ? "Owed at start" : "Starting balance";
      root.querySelector("#a-hint").textContent = g === "loan" ? "Enter the remaining loan balance when you started tracking. Pay it from I owe; you can split out the interest each time." : "Starting balance is what the account held when you started tracking. For cards, it's what you owed."; };
    root.querySelectorAll('input[name="grp"]').forEach(r => r.onchange = sync); sync();
    root.querySelector("#a-save").onclick = () => {
      const E = m => root.querySelector("#a-err").textContent = m;
      const name = root.querySelector("#a-name").value.trim(); if (!name) return E("Give it a name.");
      const g = grp();
      const o = readAmt(root, "#a-open", {label: "starting balance"}); if (o.err) return E(o.err);
      const rec = {...a, name, group: g, opening: o.v};
      delete rec.limit; delete rec.monthly; delete rec.dueDay; delete rec.cutDay; delete rec.payDay;
      if (g === "card" || g === "bnpl") { const l = readAmt(root, "#a-limit", {label: "credit limit"}); if (l.err) return E(l.err); if (l.v) rec.limit = l.v;
        const dd = sel => { const n = parseInt(root.querySelector(sel).value, 10); return n >= 1 && n <= 31 ? n : 0; };
        const c = dd("#a-cut"), pd = dd("#a-pay"); if (c) rec.cutDay = c; if (pd) rec.payDay = pd; }
      if (g === "loan") { const m = readAmt(root, "#a-monthly", {label: "monthly amortization"}); if (m.err) return E(m.err); if (m.v) rec.monthly = m.v; rec.dueDay = Math.min(31, Math.max(1, parseInt(root.querySelector("#a-day").value, 10) || 1)); }
      const ar = root.querySelector("#a-arch"); if (ar) rec.archived = ar.checked;
      if (!id) rec.order = Object.keys(S.data.accounts).length;
      S.data.accounts[id || newId()] = rec; save(); closeSheet(); toast(id ? "Saved" : "Added");
    };
  });
}
function openPerson(id, kindDefault) {
  const p = id ? S.data.people[id] : {name: "", kind: kindDefault || "rent", detail: "", monthly: 0, dueDay: 1, opening: 0};
  openSheet(id ? "Edit person" : "Add person", `
  <div class="field"><span class="lbl">Why they owe you</span>${tilesHTML("kind", Object.entries(KINDS).map(([k, x]) => [k, x.label, x.icon]), p.kind)}</div>
  <div class="grid2">
    <label class="field"><span class="lbl">Name</span><input class="input" id="p-name" maxlength="50" value="${esc(p.name)}"></label>
    <label class="field"><span class="lbl" id="p-detail-l">Detail</span><input class="input" id="p-detail" maxlength="40" placeholder="Optional" value="${esc(p.detail || "")}"></label>
  </div>
  <div class="grid2" id="p-monthly-f">
    <label class="field"><span class="lbl">Monthly amount</span><input class="input num" id="p-monthly" inputmode="decimal" placeholder="0.00" value="${amtVal(p.monthly)}"></label>
    <label class="field"><span class="lbl">Due day</span><input class="input num" id="p-day" type="number" min="1" max="31" value="${p.dueDay || 1}"></label>
  </div>
  <label class="field"><span class="lbl">Already owes you</span><input class="input num" id="p-open" inputmode="decimal" placeholder="0.00" value="${amtVal(p.opening)}"></label>
  <p class="hint" style="margin:0" id="p-hint"></p>
  ${id ? `<label class="check"><input type="checkbox" id="p-arch"${p.archived ? " checked" : ""}>Hide (moved out / settled)</label>` : ""}
  <div class="err" id="p-err"></div>
  <button type="button" class="btn primary block" id="p-save">${ico("check")}${id ? "Save" : "Add person"}</button>`, root => {
    const sync = () => {
      const k = val(root, "kind") || "rent";
      root.querySelector("#p-monthly-f").hidden = !KINDS[k].monthly;
      root.querySelector("#p-detail-l").textContent = k === "rent" ? "Unit" : k === "internet" ? "Plan / area" : "Detail";
      root.querySelector("#p-hint").textContent = k === "loan" ? "Enter what they owe you today. Lend more later from their card; it'll come out of the account you pick." : "Amounts owed from before you started tracking count as over 60 days.";
    };
    root.querySelectorAll('input[name="kind"]').forEach(r => r.onchange = sync); sync();
    root.querySelector("#p-save").onclick = () => {
      const E = m => root.querySelector("#p-err").textContent = m;
      const kind = val(root, "kind") || "rent";
      const name = root.querySelector("#p-name").value.trim(); if (!name) return E("Enter their name.");
      let monthly = 0, dueDay = 1;
      if (KINDS[kind].monthly) { const m = readAmt(root, "#p-monthly", {label: "monthly amount"}); if (m.err) return E(m.err); monthly = m.v; dueDay = Math.min(31, Math.max(1, parseInt(root.querySelector("#p-day").value, 10) || 1)); }
      const o = readAmt(root, "#p-open", {label: "amount owed"}); if (o.err) return E(o.err);
      const rec = {...p, name, kind, detail: root.querySelector("#p-detail").value.trim(), monthly, dueDay, opening: o.v};
      const ar = root.querySelector("#p-arch"); if (ar) rec.archived = ar.checked;
      S.data.people[id || newId()] = rec; save(); closeSheet(); toast(id ? "Saved" : "Added");
    };
  });
}

/* ================= nav + boot ================= */
document.querySelectorAll(".nav button").forEach(b => b.onclick = () => go(b.dataset.v));
$("#back").onclick = () => go("more");
$("#fab").onclick = () => openTxn();
$("#mprev").onclick = () => { S.month = mShift(S.month, -1); render(); };
$("#mnext").onclick = () => { S.month = mShift(S.month, 1); render(); };
window.addEventListener("storage", e => { if (e.key === KEY) { const raw = load(); S.data = raw ? normalize(raw)[0] : null; render(); } });
render();
showLock();
if ("serviceWorker" in navigator) {
  const hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.register("sw.js").then(r => r.update?.()).catch(() => {});
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadController || $("#upd")) return;
    const b = document.createElement("div"); b.id = "upd"; b.className = "toast"; b.style.cssText = "display:flex;gap:12px;align-items:center";
    b.innerHTML = `<span>New version ready</span><button type="button" class="btn primary">Refresh</button>`;
    b.querySelector("button").onclick = () => location.reload();
    $("#toast-root").replaceChildren(b);
  });
}
})();
