// Jobvia / Admin / src / utils / roleQuestion.js

/* -------- Parse CSV Text -------- */
export function parseCSV(text) {
  if (!text) {
    return [];
  }

  text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  const rows = [];

  let insideQuotes = false;
  let cur = "";
  let line = [];

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (ch === '"' && !insideQuotes) {
      insideQuotes = true;
      continue;
    }

    if (ch === '"' && insideQuotes && next === '"') {
      cur += '"';
      i++;
      continue;
    }

    if (ch === '"' && insideQuotes) {
      insideQuotes = false;
      continue;
    }

    if (ch === "," && !insideQuotes) {
      line.push(cur);
      cur = "";
      continue;
    }

    if (ch === "\n" && !insideQuotes) {
      line.push(cur);
      rows.push(line.slice());
      line = [];
      cur = "";
      continue;
    }
    cur += ch;
  }

  if (cur !== "" || line.length > 0) {
    line.push(cur);
    rows.push(line.slice());
  }

  const nonEmpty = rows.filter((r) =>
    r.some((c) => (c || "").toString().trim() !== ""),
  );

  if (nonEmpty.length === 0) {
    return [];
  }

  const headersRaw = nonEmpty[0].map((h) => (h || "").toString().trim());
  const headers = headersRaw.map((h) => h.toLowerCase().replace(/\s+/g, "_"));
  const data = [];

  for (let i = 1; i < nonEmpty.length; i++) {
    const row = nonEmpty[i];
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = row[idx] != null ? row[idx].toString().trim() : "";
    });
    obj.__rawCells = nonEmpty[i];
    data.push(obj);
  }
  return { headersRaw, headers, data };
}

/* -------- Split Multiple Values -------- */
export const splitMulti = (cell) =>
  (cell || "")
    .toString()
    .split(/[\n;|]+/)
    .map((s) => s.trim())
    .filter(Boolean);

/* -------- Parse Company Name and Date -------- */
export function parseCompanyEntry(entry) {
  if (!entry) {
    return { name: "", date: "" };
  }

  const paren = entry.match(/^(.*?)\s*\(\s*([^)]+)\s*\)\s*$/);

  if (paren) {
    return { name: paren[1].trim(), date: paren[2].trim() };
  }

  const hyphen = entry.match(/^(.*?)\s*[-–—]\s*(.+)$/);

  if (hyphen && /\d/.test(hyphen[2])) {
    return { name: hyphen[1].trim(), date: hyphen[2].trim() };
  }

  return { name: entry.trim(), date: "" };
}

/* -------- Remove Duplicate Strings -------- */
export function uniqueStrings(arr) {
  const s = new Set();
  arr.forEach((x) => {
    if (x && x.toString().trim()) {
      s.add(x.toString().trim());
    }
  });
  return Array.from(s);
}

/* -------- Remove Duplicate Company and Date Pairs -------- */
export function uniquePairs(arr) {
  const seen = new Set();
  const out = [];

  arr.forEach((p) => {
    const k = `${(p.name || "").toLowerCase()}||${(p.date || "").toLowerCase()}`;
    if (!seen.has(k)) {
      seen.add(k);
      out.push({ name: p.name || "", date: p.date || "" });
    }
  });
  return out;
}

/* -------- Format Date as DD/MM/YYYY -------- */
export function formatDate(dateStr) {
  if (!dateStr) {
    return "";
  }

  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    return dateStr;
  }

  return date.toLocaleDateString("en-GB");
}
