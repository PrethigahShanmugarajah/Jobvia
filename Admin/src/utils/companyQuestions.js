// Jobvia / Admin / src / utils / companyQuestions.js

/* -------- Converts count strings such as "2.5k" or "1,000" into numbers. -------- */
export const parseCountString = (str) => {
  if (!str) {
    return NaN;
  }

  const trimmed = str.trim().toLowerCase().replace(/,/g, "");
  const match = trimmed.match(/^(\d+(?:\.\d+)?)(k)?\+?$/);

  if (!match) {
    return NaN;
  }

  const num = parseFloat(match[1]);
  const isK = match[2] === "k";
  return isK ? num * 1000 : num;
};

/* -------- Formats large numbers into shorter strings, such as 2500 → "2.5k+". -------- */
export const formatCountShort = (n) => {
  const num = Number(n) || 0;
  if (num >= 1000) {
    const k = num / 1000;
    if (num % 1000 === 0) return `${k}k`;
    return `${parseFloat(k.toFixed(1)).toString()}k+`;
  }
  return String(num);
};

/* -------- Formats valid dates as D/M/YYYY and returns an empty string for missing dates. -------- */
export const formatDatePretty = (dateInput) => {
  if (!dateInput) {
    return "";
  }

  const d = new Date(dateInput);

  if (isNaN(d.getTime())) {
    return dateInput;
  }

  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

/* -------- Parses CSV text into rows and cells, supporting quoted fields and escaped quotes. -------- */
export const parseCSVText = (text) => {
  const rows = [];
  let i = 0;
  const len = text.length;
  let cur = "";
  let row = [];
  let inQuotes = false;

  while (i < len) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < len && text[i + 1] === '"') {
          cur += '"';
          i += 2;
          continue;
        } else {
          inQuotes = false;
          i++;
          continue;
        }
      } else {
        cur += ch;
        i++;
        continue;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
        i++;
        continue;
      }

      if (ch === ",") {
        row.push(cur);
        cur = "";
        i++;
        continue;
      }

      if (ch === "\r") {
        if (i + 1 < len && text[i + 1] === "\n") i++;
        row.push(cur);
        rows.push(row);
        row = [];
        cur = "";
        i++;
        continue;
      }

      if (ch === "\n") {
        row.push(cur);
        rows.push(row);
        row = [];
        cur = "";
        i++;
        continue;
      }

      cur += ch;
      i++;
      continue;
    }
  }

  if (inQuotes) {
    row.push(cur);
    rows.push(row);
  } else {
    if (cur !== "" || row.length > 0) {
      row.push(cur);
      rows.push(row);
    }
  }

  return rows.map((r) => r.map((cell) => (cell == null ? "" : cell.trim())));
};
