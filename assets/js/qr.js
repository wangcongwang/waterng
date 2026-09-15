/* ---------------------------------------------------------------------------
   qr.js — minimal, dependency-free QR Code generator (ISO/IEC 18004)

   Scope: byte mode, error-correction level M, versions 1–10, all 8 mask
   patterns with standards-based penalty scoring. That is enough for the
   Visa QR payment payloads used on the checkout pages (a short URL of ~120
   characters or fewer).

   Usage:
     QRCode.encode('https://…')          -> { size, version, mask, modules }
     QRCode.svg('https://…', { size: 220 })  -> '<svg …>…</svg>'
   --------------------------------------------------------------------------- */
(function (global) {
  'use strict';

  /* --- Galois field GF(256), primitive polynomial 0x11D ------------------ */
  const EXP = new Uint8Array(512);
  const LOG = new Uint8Array(256);
  (function initGF() {
    let x = 1;
    for (let i = 0; i < 255; i++) {
      EXP[i] = x;
      LOG[x] = i;
      x <<= 1;
      if (x & 0x100) x ^= 0x11d;
    }
    for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
  })();

  function gfMul(a, b) {
    if (a === 0 || b === 0) return 0;
    return EXP[LOG[a] + LOG[b]];
  }

  /* Generator polynomial for `degree` error-correction codewords. */
  function rsGenerator(degree) {
    let poly = [1];
    for (let i = 0; i < degree; i++) {
      const next = new Array(poly.length + 1).fill(0);
      for (let j = 0; j < poly.length; j++) {
        next[j] ^= poly[j];
        next[j + 1] ^= gfMul(poly[j], EXP[i]);
      }
      poly = next;
    }
    return poly;
  }

  /* Reed–Solomon remainder: `ecLen` codewords for the given data codewords. */
  function rsEncode(data, ecLen) {
    const gen = rsGenerator(ecLen);
    const buf = data.slice();
    for (let i = 0; i < ecLen; i++) buf.push(0);
    for (let i = 0; i < data.length; i++) {
      const coef = buf[i];
      if (coef === 0) continue;
      for (let j = 0; j < gen.length; j++) buf[i + j] ^= gfMul(gen[j], coef);
    }
    return buf.slice(data.length);
  }

  /* --- Version / EC-block tables (EC level M) ---------------------------
     [ecCodewordsPerBlock, [[blockCount, dataCodewordsPerBlock], …]]        */
  const RS_M = {
    1: [10, [[1, 16]]],
    2: [16, [[1, 28]]],
    3: [26, [[1, 44]]],
    4: [18, [[2, 32]]],
    5: [24, [[2, 43]]],
    6: [16, [[4, 27]]],
    7: [18, [[4, 31]]],
    8: [22, [[2, 38], [2, 39]]],
    9: [22, [[3, 36], [2, 37]]],
    10: [26, [[4, 43], [1, 44]]]
  };

  const ALIGN = {
    1: [], 2: [6, 18], 3: [6, 22], 4: [6, 26], 5: [6, 30],
    6: [6, 34], 7: [6, 22, 38], 8: [6, 24, 42], 9: [6, 26, 46], 10: [6, 28, 50]
  };

  function dataCodewords(version) {
    return RS_M[version][1].reduce((sum, [n, k]) => sum + n * k, 0);
  }

  /* Largest byte-mode payload that fits the given version at EC level M. */
  function byteCapacity(version) {
    const countBits = version <= 9 ? 8 : 16;
    return Math.floor((dataCodewords(version) * 8 - 4 - countBits) / 8);
  }

  function pickVersion(len) {
    for (let v = 1; v <= 10; v++) if (len <= byteCapacity(v)) return v;
    return null;
  }

  /* --- Bit stream ------------------------------------------------------- */
  function toUtf8Bytes(str) {
    if (global.TextEncoder) return Array.from(new global.TextEncoder().encode(str));
    const out = [];
    for (let i = 0; i < str.length; i++) {
      let c = str.charCodeAt(i);
      if (c < 0x80) out.push(c);
      else if (c < 0x800) out.push(0xc0 | (c >> 6), 0x80 | (c & 63));
      else out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
    }
    return out;
  }

  function buildCodewords(bytes, version) {
    const totalData = dataCodewords(version);
    const bits = [];
    const push = (value, length) => {
      for (let i = length - 1; i >= 0; i--) bits.push((value >>> i) & 1);
    };
    push(0x4, 4);                                     // byte mode indicator
    push(bytes.length, version <= 9 ? 8 : 16);        // character count
    bytes.forEach(b => push(b, 8));

    const capacityBits = totalData * 8;
    if (bits.length + 4 <= capacityBits) push(0, 4);   // terminator
    else while (bits.length < capacityBits) bits.push(0);
    while (bits.length % 8 !== 0) bits.push(0);

    const out = [];
    for (let i = 0; i < bits.length; i += 8) {
      let b = 0;
      for (let j = 0; j < 8; j++) b = (b << 1) | bits[i + j];
      out.push(b);
    }
    let pad = 0xec;
    while (out.length < totalData) { out.push(pad); pad = pad === 0xec ? 0x11 : 0xec; }
    return out;
  }

  /* Split into blocks, add EC codewords, then interleave per the spec. */
  function interleave(codewords, version) {
    const [ecLen, groups] = RS_M[version];
    const blocks = [];
    let offset = 0;
    groups.forEach(([count, k]) => {
      for (let i = 0; i < count; i++) {
        const data = codewords.slice(offset, offset + k);
        offset += k;
        blocks.push({ data, ec: rsEncode(data, ecLen) });
      }
    });
    const maxData = Math.max.apply(null, blocks.map(b => b.data.length));
    const out = [];
    for (let i = 0; i < maxData; i++) {
      blocks.forEach(b => { if (i < b.data.length) out.push(b.data[i]); });
    }
    for (let i = 0; i < ecLen; i++) blocks.forEach(b => out.push(b.ec[i]));
    return out;
  }

  /* --- Matrix construction --------------------------------------------- */
  function blankMatrix(version) {
    const size = version * 4 + 17;
    return { size, m: Array.from({ length: size }, () => new Array(size).fill(null)) };
  }

  function placeFinder(m, size, row, col) {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const rr = row + r, cc = col + c;
        if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
        const inRing = (r >= 0 && r <= 6 && (c === 0 || c === 6)) ||
          (c >= 0 && c <= 6 && (r === 0 || r === 6)) ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4);
        m[rr][cc] = inRing ? 1 : 0;
      }
    }
  }

  function placeFunctionPatterns(version, m, size) {
    placeFinder(m, size, 0, 0);
    placeFinder(m, size, 0, size - 7);
    placeFinder(m, size, size - 7, 0);

    for (let i = 8; i <= size - 9; i++) {
      const dark = i % 2 === 0 ? 1 : 0;
      m[6][i] = dark;
      m[i][6] = dark;
    }

    const pos = ALIGN[version];
    for (let i = 0; i < pos.length; i++) {
      for (let j = 0; j < pos.length; j++) {
        const r = pos[i], c = pos[j];
        const overlapsFinder = (r <= 8 && c <= 8) ||
          (r <= 8 && c >= size - 9) ||
          (r >= size - 9 && c <= 8);
        if (overlapsFinder) continue;
        for (let dr = -2; dr <= 2; dr++) {
          for (let dc = -2; dc <= 2; dc++) {
            const edge = Math.abs(dr) === 2 || Math.abs(dc) === 2;
            m[r + dr][c + dc] = (edge || (dr === 0 && dc === 0)) ? 1 : 0;
          }
        }
      }
    }

    // Reserve the format-info areas (values filled in once the mask is known).
    for (let i = 0; i <= 8; i++) {
      if (m[8][i] === null) m[8][i] = 0;
      if (m[i][8] === null) m[i][8] = 0;
    }
    for (let i = 0; i < 8; i++) {
      if (m[8][size - 1 - i] === null) m[8][size - 1 - i] = 0;
      if (m[size - 1 - i][8] === null) m[size - 1 - i][8] = 0;
    }
    m[size - 8][8] = 1;   // permanently dark module
  }

  function versionBits(version) {
    let d = version;
    for (let i = 0; i < 12; i++) d = (d << 1) ^ ((d >>> 11) * 0x1f25);
    return (version << 12) | d;
  }

  function placeVersionInfo(version, m, size) {
    if (version < 7) return;
    const bits = versionBits(version);
    for (let i = 0; i < 18; i++) {
      const bit = (bits >>> i) & 1;
      m[Math.floor(i / 3)][(i % 3) + size - 8 - 3] = bit;
      m[(i % 3) + size - 8 - 3][Math.floor(i / 3)] = bit;
    }
  }

  /* Format info: 5 data bits (EC indicator << 3 | mask) + BCH(15,5) + mask 0x5412.
     EC level M has indicator bits 0b00. */
  function formatBits(mask) {
    const data = (0 << 3) | mask;
    let d = data << 10;
    for (let i = 4; i >= 0; i--) {
      if ((d >>> (i + 10)) & 1) d ^= 0x537 << i;
    }
    return (((data << 10) | d) ^ 0x5412) & 0x7fff;
  }

  function placeFormatInfo(mask, m, size) {
    const bits = formatBits(mask);
    for (let i = 0; i < 15; i++) {
      const bit = (bits >>> i) & 1;
      if (i < 6) m[i][8] = bit;
      else if (i < 8) m[i + 1][8] = bit;
      else m[size - 15 + i][8] = bit;

      if (i < 8) m[8][size - i - 1] = bit;
      else if (i < 9) m[8][15 - i - 1 + 1] = bit;
      else m[8][15 - i - 1] = bit;
    }
    m[size - 8][8] = 1;
  }

  const MASKS = [
    (i, j) => (i + j) % 2 === 0,
    (i) => i % 2 === 0,
    (_, j) => j % 3 === 0,
    (i, j) => (i + j) % 3 === 0,
    (i, j) => (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0,
    (i, j) => ((i * j) % 2) + ((i * j) % 3) === 0,
    (i, j) => (((i * j) % 2) + ((i * j) % 3)) % 2 === 0,
    (i, j) => (((i * j) % 3) + ((i + j) % 2)) % 2 === 0
  ];

  function placeData(codewords, maskIndex, m, size) {
    const mask = MASKS[maskIndex];
    let inc = -1, row = size - 1, bitIndex = 7, byteIndex = 0;
    const totalBits = codewords.length * 8;

    for (let col = size - 1; col > 0; col -= 2) {
      if (col === 6) col--;
      for (;;) {
        for (let c = 0; c < 2; c++) {
          const cc = col - c;
          if (m[row][cc] !== null) continue;
          let dark = false;
          const bitPos = byteIndex * 8 + (7 - bitIndex);
          if (bitPos < totalBits) {
            dark = ((codewords[byteIndex] >>> bitIndex) & 1) === 1;
          }
          if (mask(row, cc)) dark = !dark;
          m[row][cc] = dark ? 1 : 0;
          bitIndex--;
          if (bitIndex === -1) { byteIndex++; bitIndex = 7; }
        }
        row += inc;
        if (row < 0 || row >= size) { row -= inc; inc = -inc; break; }
      }
    }
  }

  /* --- Mask penalty scoring (spec §8.8.2) ------------------------------- */
  function penalty(m, size) {
    let score = 0;

    const runScore = (get) => {
      let s = 0;
      for (let a = 0; a < size; a++) {
        let run = 1;
        for (let b = 1; b < size; b++) {
          if (get(a, b) === get(a, b - 1)) {
            run++;
          } else {
            if (run >= 5) s += 3 + (run - 5);
            run = 1;
          }
        }
        if (run >= 5) s += 3 + (run - 5);
      }
      return s;
    };
    score += runScore((r, c) => m[r][c]);
    score += runScore((c, r) => m[r][c]);

    for (let r = 0; r < size - 1; r++) {
      for (let c = 0; c < size - 1; c++) {
        const v = m[r][c];
        if (v === m[r][c + 1] && v === m[r + 1][c] && v === m[r + 1][c + 1]) score += 3;
      }
    }

    const pat1 = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0];
    const pat2 = [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1];
    const matches = (line, start, pat) => {
      for (let k = 0; k < 11; k++) if (line[start + k] !== pat[k]) return false;
      return true;
    };
    const scanLine = (line) => {
      let s = 0;
      for (let i = 0; i + 11 <= size; i++) {
        if (matches(line, i, pat1) || matches(line, i, pat2)) s += 40;
      }
      return s;
    };
    for (let r = 0; r < size; r++) {
      const row = m[r].slice();
      score += scanLine(row);
    }
    for (let c = 0; c < size; c++) {
      const col = [];
      for (let r = 0; r < size; r++) col.push(m[r][c]);
      score += scanLine(col);
    }

    let dark = 0;
    for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) if (m[r][c]) dark++;
    const percent = (dark * 100) / (size * size);
    score += Math.floor(Math.abs(percent - 50) / 5) * 10;

    return score;
  }

  /* --- Public API ------------------------------------------------------- */
  function encode(text) {
    const bytes = toUtf8Bytes(String(text));
    const version = pickVersion(bytes.length);
    if (!version) {
      throw new Error('QRCode: payload too long for versions 1–10 (max 213 bytes)');
    }

    const codewords = interleave(buildCodewords(bytes, version), version);
    const { size } = blankMatrix(version);

    let best = null;
    for (let maskIndex = 0; maskIndex < 8; maskIndex++) {
      const m = Array.from({ length: size }, () => new Array(size).fill(0));
      const grid = { size, m };
      grid.m = m;
      buildInto(grid, version, maskIndex, codewords);
      const p = penalty(m, size);
      if (!best || p < best.penalty) best = { m, mask: maskIndex, penalty: p };
    }

    return { size, version, mask: best.mask, modules: best.m };
  }

  /* Build one complete symbol for a fixed mask index. */
  function buildInto(grid, version, maskIndex, codewords) {
    const { m, size } = grid;
    for (let r = 0; r < size; r++) m[r].fill(null);
    placeFunctionPatterns(version, m, size);
    placeVersionInfo(version, m, size);
    placeData(codewords, maskIndex, m, size);
    placeFormatInfo(maskIndex, m, size);
  }

  function svg(text, options) {
    const opts = options || {};
    const quiet = opts.quiet == null ? 4 : opts.quiet;
    const px = opts.size || 220;
    const color = opts.color || 'currentColor';
    const result = encode(text);
    const total = result.size + quiet * 2;
    const unit = px / total;

    let path = '';
    for (let r = 0; r < result.size; r++) {
      for (let c = 0; c < result.size; c++) {
        if (!result.modules[r][c]) continue;
        path += 'M' + ((c + quiet) * unit).toFixed(2) + ' ' + ((r + quiet) * unit).toFixed(2) +
          'h' + unit.toFixed(2) + 'v' + unit.toFixed(2) + 'h-' + unit.toFixed(2) + 'z';
      }
    }

    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + px + ' ' + px +
      '" width="' + px + '" height="' + px + '" role="img" shape-rendering="crispEdges">' +
      '<rect width="' + px + '" height="' + px + '" fill="none"/>' +
      '<path fill="' + color + '" d="' + path + '"/></svg>';
  }

  global.QRCode = { encode, svg, byteCapacity, maxVersion: 10 };
})(window);
