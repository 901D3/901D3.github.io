function bayer(f) {
  let { width: w, height: h, data: d } = f,
  sqSz = w * h,
  lvls = ["r", "g", "b"].map(c => pFl(gIdV(c + "LvlsInput")) - 1),
  rnd = gId("randMat").checked,
  linr = gId("linear").checked,
  matSz,
  bM = parseMat(gIdV("errDiffsMatInput"));

  if (gId("autoDiv").checked) gId("errDiffsDivInput").value = matSz = findHighest(bM) + 1;
  else matSz = pFl(gIdV("errDiffsDivInput"));

  if (!Array.isArray(bM[0][0])) bM = [bM]; // force 3D

  let t = 255 / matSz;
  mY = bM[0].length, mX = bM[0][0].length,
  matrixCache = Array.from({ length: ceil(h / mY) }, () =>
    Array.from({ length: ceil(w / mX) }, () =>
      rnd ? bM[floor(random() * bM.length)] : bM[0]
    )
  );

  for (let c = 0; c < 3; c++) {
    let lvl = lvls[c];
    for (let i = 0; i < sqSz; i++) {
      let x = i % w, y = (i / w) | 0,
      bVal = (matrixCache[floor(y / mY)][floor(x / mX)])[y % mY][x % mX] * t / 255,
      j = i * 4,
      sRGB = d[j + c],
      cl = linr ? linearLUT[sRGB] * 255 : sRGB;

      d[j + c] = (floor(lvl * (cl / 255) + bVal) / lvl) * 255;
    }
  }
}


function arithmeticCustom(f) {
  let {
    width: w,
    height: h,
    data: d
  } = f,
    sqSz = w * h,
    lvls = ["r", "g", "b"].map(c => pFl(gIdV(c + "LvlsInput")) - 1),
    A = gId("aLvlsInput").value,
    k = gId("kLvlsInput").value,
    expr = gId("arithmeticInput").value;

  let cp = new Function("x", "y", "c", "A", "k", `return (${expr})`);

  for (c = 0; c < 3; c++) {
    for (j = 0; j < sqSz; j++) {
      let x = j % w,
        y = (j / w) | 0;
      d[((x + y * w) * 4) + c] = floor(lvls[c] * ((linr ? ceil(ln(d[i + c]) * 255) : d[i + c]) / 255) + cp(x, y, c, A, k)) / lvls[c] * 255;
    }
  }
}

//--------------------------------------------------------------------------------------------------------------------

//OP shortcut for error diffusion
function diffs(b, d, i, w, o, olength, errC, wt, rev, buff, c, mul) {
  let basePixelIndex = i / mul,
  target = buff ? b : d;

  for (let j = 0; j < olength; j++) {
    const ox = o[j][0],
          newX = basePixelIndex + (rev ? -ox : ox) + (o[j][1]) * w;

    target[newX * mul + c] += errC * wt[j];
  }
}

let wt = [], offs = [];

function updateErrDiffs() {
  ({ wt, offs } = errDiffsConv(gIdV("errDiffsMatInput")));
}

gId("errDiffsMatInput").addEventListener("input", updateErrDiffs);

//--------------------------------------------------------------------------------------------------------------------

function errDiffsCustom(f) {
  const { width: w, height: h, data: d } = f,
  sqSz = w * h,
  b = buffChg(w, h),
  lvls = ["r", "g", "b"].map(c => pFl(gIdV(c + "LvlsInput")) - 1),
  errLvls = ["R", "G", "B"].map(c => pFl(gIdV("err" + c))),
  linr = gId("linear").checked,
  serp = gId("serp").checked,
  buff = gId("buff").checked,
  div = gId("autoDiv").checked ?
  wt.reduce((sum, v) => sum + (v ?? 0), 0) :
  pFl(gIdV("errDiffsDivInput")),
  o = offs.length;

  gId("errDiffsDivInput").value = div;

  for (let c = 0; c < 3; c++) {
    const lvl = lvls[c], errLvl = errLvls[c];
    for (let j = 0; j < sqSz; j++) {
      const x = j % w,
      y = (j / w) | 0,
      rev = serp && (y & 1),
      pI = ((rev ? w - 1 - x : x)) + y * w,
      i = buff ? pI * 3 : pI * 4,
      i4 = pI * 4,
      sRGB = d[i4 + c],
      cl = linr ? linearLUT[sRGB] * 255 : sRGB,
      eErrC = buff ? b[i + c] : 0,
      C = round((lvl * (cl + eErrC)) / 255) * (255 / lvl),
      errC = ((cl - C) + eErrC) * errLvl / div;

      d[i4 + c] = C;
      diffs(b, d, i, w, offs, o, errC, wt, rev, buff, c, buff ? 3 : 4);
    }
  }
}

function varErrDiffsCustom(f) {
  const {width: w, height: h, data: d} = f,
  sqSz = w * h,
  coeff = customCoeffs(),
  b = buffChg(w, h),
  linr = gId("linear").checked,
  serp = gId("serp").checked,
  buff = gId("buff").checked,
  lvls = ["r", "g", "b"].map(c => pFl(gIdV(c + "LvlsInput")) - 1),
  errLvls = ["R", "G", "B"].map(c => pFl(gIdV("err" + c))),
  getCoeff = (cl) => {
    if (cl > 127) {
      let cfi = 127 - (cl - 128);
      return [
        coeff[cfi * 3],
        coeff[cfi * 3 + 1],
        coeff[cfi * 3 + 2]
      ];
    } else {
      let cfi = cl * 3;
      return [
        coeff[cfi],
        coeff[cfi + 1],
        coeff[cfi + 2]
      ];
    }
  };

  for (c = 0; c < 3; c++) {
    for (j = 0; j < sqSz; j++) {
      let x = j % w,
        y = (j / w) | 0,
        rev = serp && (y % 2 !== 0),
        i1 = ((rev ? w - 1 - x : x) + y * w) * 4,
        i = buff ? (i1 / 4) * 3 : i1,
        sRGB = d[i1 + c],
        cl = linr ? floor(linearLUT[sRGB] * 255) : sRGB,
        [rC, dLC, dC] = getCoeff(cl);
        div = rC + dLC + dC,
        eErrC = buff ? b[i + c] : 0,
        C = round(((lvls[c]) * (cl + eErrC)) / 255) * (255 / lvls[c]),
        errC = ((cl - C) + eErrC) * errLvls[c] / div,
        n = rev ? buff ? -3 : -4 : buff ? 3 : 4;

        d[i1 + c] = C;
        if (buff) {
          b[i + n + c] += errC * rC;
          i += w * 3;
          b[i - n + c] += errC * dLC;
          b[i + c] += errC * dC;
        } else {
          d[i + n + c] += errC * rC;
          i += w * 4;
          d[i - n + c] += errC * dLC;
          d[i + c] += errC * dC;
      }
    }
  }
}
