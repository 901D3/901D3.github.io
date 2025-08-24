gId("bnGen").addEventListener("click", function () {
  if (dropdownMatrix.value === "bluenoise") {
    bM = toRGBMat(bnCtx.getImageData(0, 0, bnCanvas.width, bnCanvas.height));
    gId("errDiffsMatInput").value = parseMatRev(JSON.stringify(bM));
  } else {
    bM = parseMat(gIdV("errDiffsMatInput"));
  }
});

function findHighest(matrix) {
  let highestValue = -Infinity;

  matrix.forEach((slice) => {
    slice.forEach((row) => {
      row.forEach((v) => {
        if (v > highestValue) {
          highestValue = v;
        }
      });
    });
  });

  return highestValue;
}

function toRGBMat(f) {
  let { width, height, data } = f,
    rgbMatrix = [];

  for (let y = 0; y < height; y++) {
    let row = [];
    for (let x = 0; x < width; x++) {
      let i = (y * width + x) << 2,
        cl = data[i];
      row.push(cl);
    }
    rgbMatrix.push(row);
  }

  return rgbMatrix;
}

//custom buffers for error diffusion
function buffChg(w, h) {
  switch (gIdV("buffers")) {
    case "Int8Array":
      return new Int8Array((w * h) << 2);
    case "Int16Array":
      return new Int16Array(w * h * 3);
    case "Int32Array":
      return new Int32Array(w * h * 3);
    case "Float32Array":
      return new Float32Array(w * h * 3);
    case "Float64Array":
      return new Float64Array(w * h * 3);
  }
}

gId("buff").addEventListener("change", () => {
  if (gId("buff").checked) {
    setDisp("bufferDisp", "block");
  } else {
    setDisp("bufferDisp", "none");
  }
});

gId("buffers").addEventListener("change", () => {
  buffChg();
  process();
});

//--------------------------------------------------------------------------------------------------------------------

function bayer(f) {
  let { data: d } = f,
    bM = parseMat(gIdV("errDiffsMatInput"));

  if (gId("autoDiv").checked)
    gId("errDiffsDivInput").value = matSz = findHighest(bM) + 1;
  else matSz = pFl(gIdV("errDiffsDivInput"));

  if (!Array.isArray(bM[0][0])) bM = [bM]; // force 3D

  let t = 255 / matSz;
  (mY = bM[0].length),
    (mX = bM[0][0].length),
    (matrixCache = Array.from({ length: ceil(h / mY) }, () =>
      Array.from({ length: ceil(w / mX) }, () =>
        rnd ? bM[floor(random() * bM.length)] : bM[0]
      )
    ));

  for (let c = 0; c < 3; c++) {
    let lvl = lvls[c];
    for (let i = 0; i < sqSz; i++) {
      let x = i % w,
        y = (i / w) | 0,
        bVal =
          (matrixCache[floor(y / mY)][floor(x / mX)][y % mY][x % mX] * t) / 255,
        j = i << 2,
        sRGB = d[j + c],
        cl = linr ? linearLUT[sRGB] * 255 : sRGB;

      d[j + c] = (floor(lvl * (cl / 255) + bVal) / lvl) * 255;
    }
  }
}

function arithmeticCustom(f) {
  const { data: d } = f,
    A = gId("aLvlsInput").value,
    k = gId("kLvlsInput").value,
    expr = gId("arithmeticInput").value,
    cp = new Function("x", "y", "c", "A", "k", `return (${expr})`);

  for (c = 0; c < 3; c++) {
    const lvl = lvls[c],
      b = lvl / 255;
    for (let y = 0; y < h; y++) {
      yOffs = y * w;
      for (let x = 0; x < w; x++) {
        (i = (x + yOffs) << 2),
          (sRGB = d[i + c]),
          (cl = linr ? linearLUT[sRGB] : sRGB),
          (C = (floor(cl * b + cp(x, y, c, A, k)) / lvl) * 255);
        d[i + c] = C;
      }
    }
  }
}

//--------------------------------------------------------------------------------------------------------------------

gId("errDiffsMatInput").addEventListener("input", function () {
  ({ wt, offs } = errDiffsConv(gIdV("errDiffsMatInput")));
  offslength = offs.length;
  div = gId("autoDiv").checked
    ? wt.reduce((sum, v) => sum + (v ?? 0), 0)
    : pFl(gIdV("errDiffsDivInput"));
  gId("errDiffsDivInput").value = div;
});

function diffs(width, rev, wt, c, mul, errC, offslength, pixelIndex, target) {
  for (let j = 0; j < offslength; j++) {
    const ox = offs[j][0];
    target[(pixelIndex + (rev ? -ox : ox) + offs[j][1] * width) * mul + c] +=
      errC * wt[j];
  }
}

function errDiffsCustom(f) {
  const { data: d } = f,
    b = buffChg(w, h),
    target = buff ? b : d;
  gId("errDiffsDivInput").value = div;

  for (let c = 0; c < 3; c++) {
    const lvl = lvls[c],
      errLvl = errLvls[c],
      l = 255 / lvl,
      el = errLvl / div;
    printLog(lvl, errLvl);
    for (let y = 0; y < h; y++) {
      const rev = serp && y & 1,
        yOffs = y * w;
      for (let x = 0; x < w; x++) {
        const pI = (rev ? w - 1 - x : x) + yOffs,
          i = buff ? (pI << 1) + pI : pI << 2,
          i4 = pI << 2,
          pixelIndex = i / mul,
          sRGB = d[i4 + c],
          cl = linr ? linearLUT[sRGB] : sRGB,
          eErrC = buff ? b[i + c] : 0,
          C = round((lvl * (cl + eErrC)) / 255) * l,
          errC = (cl - C + eErrC) * el;

        d[i4 + c] = C;
        diffs(w, rev, wt, c, mul, errC, offslength, pixelIndex, target);
      }
    }
  }
}

function varErrDiffsCustom(f) {
  const { data: d } = f,
    coeff = customCoeffs(),
    b = buffChg(w, h),
    getCoeff = (cl) => {
      if (cl > 127) {
        let cfi = 127 - (cl - 128);
        return [
          coeff[cfi << (1 + cfi)],
          coeff[(cfi << (1 + cfi)) + 1],
          coeff[(cfi << (1 + cfi)) + 2],
        ];
      } else {
        let cfi = (cl << 1) + cl;
        return [coeff[cfi], coeff[cfi + 1], coeff[cfi + 2]];
      }
    };

  for (c = 0; c < 3; c++) {
    const lvl = lvls[c],
      errLvl = errLvls[c];
    for (j = 0; j < sqSz; j++) {
      let x = j % w,
        y = (j / w) | 0,
        rev = serp && y % 2 !== 0,
        i1 = ((rev ? w - 1 - x : x) + y * w) << 2,
        i = buff ? (i1 >> 1) + (i1 >> 2) : i1,
        sRGB = d[i1 + c],
        cl = linr ? floor(linearLUT[sRGB] * 255) : sRGB,
        [rC, dLC, dC] = getCoeff(cl);
      (div = rC + dLC + dC),
        (eErrC = buff ? b[i + c] : 0),
        (C = round((lvl * (cl + eErrC)) / 255) * (255 / lvl)),
        (errC = ((cl - C + eErrC) * errLvl) / div),
        (n = rev ? (buff ? -3 : -4) : buff ? 3 : 4);

      d[i1 + c] = C;
      if (buff) {
        b[i + n + c] += errC * rC;
        i += (w << 1) + w;
        b[i - n + c] += errC * dLC;
        b[i + c] += errC * dC;
      } else {
        d[i + n + c] += errC * rC;
        i += w << 2;
        d[i - n + c] += errC * dLC;
        d[i + c] += errC * dC;
      }
    }
  }
}

function zhoufang_coeffs() {
  let kLvls = [
    0, 13, 0, 5, 1, 1300249, 0, 499250, 2, 213113, 287, 99357, 3, 351854, 0,
    199965, 4, 801100, 0, 490999, 10, 704075, 297466, 303694, 22, 46613, 31917,
    21469, 32, 47482, 30617, 21900, 44, 43024, 42131, 14826, 64, 36411, 43219,
    20369, 72, 38477, 53843, 7678, 77, 40503, 51547, 7948, 85, 35865, 34108,
    30026, 95, 34117, 36899, 28983, 102, 35464, 35049, 29485, 107, 16477, 18810,
    14712, 112, 33360, 37954, 28685, 127, 35269, 36066, 28664,
  ];

  let zhoufang_coeffs = new Uint32Array(1024);
  let kP, rP, dLP, dP;
  kP = kLvls[0];
  rP = zhoufang_coeffs[0] = zhoufang_coeffs[1020 + 0] = kLvls[1];
  dLP = zhoufang_coeffs[1] = zhoufang_coeffs[1020 + 1] = kLvls[2];
  dP = zhoufang_coeffs[2] = zhoufang_coeffs[1020 + 2] = kLvls[3];
  zhoufang_coeffs[3] = zhoufang_coeffs[1020 + 3] =
    kLvls[1] + kLvls[2] + kLvls[3];

  for (let a = 1; a < 4; a++) {
    for (let i = 4; i < kLvls.length; i += 4) {
      let k = kLvls[i],
        r = kLvls[i + 1],
        dL = kLvls[i + 2],
        d = kLvls[i + 3];
      let delta = k - kP;

      for (let j = 1; kP + j <= k; j++) {
        let kj = (kP + j) << 2,
          rj = ((r * j + rP * (delta - j)) / delta) | 0,
          dLj = ((dL * j + dLP * (delta - j)) / delta) | 0,
          dj = ((d * j + dP * (delta - j)) / delta) | 0,
          sum = rj + dLj + dj;
        zhoufang_coeffs[kj] = zhoufang_coeffs[255 << (2 - kj)] = rj;
        zhoufang_coeffs[kj + 1] = zhoufang_coeffs[255 << (2 - kj + 1)] = dLj;
        zhoufang_coeffs[kj + 2] = zhoufang_coeffs[255 << (2 - kj + 2)] = dj;
        zhoufang_coeffs[kj + 3] = zhoufang_coeffs[255 << (2 - kj + 3)] = sum;
      }

      kP = k;
      (rP = r), (dLP = dL);
      dP = d;
    }
  }
  return zhoufang_coeffs;
}

let ostro_coeffs = `//right, down left, down, sum
  13,   0,   5,  //  0
  13,   0,   5,  //  1
  21,   0,  10,  //  2
   7,   0,   4,  //  3
   8,   0,   5,  //  4
  47,   3,  28,  //  5
  23,   3,  13,  //  6
  15,   3,   8,  //  7
  22,   6,  11,  //  8
  43,  15,  20,  //  9
   7,   3,   3,  // 10
 501, 224, 211,  // 11
 249, 116, 103,  // 12
 165,  80,  67,  // 13
 123,  62,  49,  // 14
 489, 256, 191,  // 15
  81,  44,  31,  // 16
 483, 272, 181,  // 17
  60,  35,  22,  // 18
  53,  32,  19,  // 19
 237, 148,  83,  // 20
 471, 304, 161,  // 21
   3,   2,   1,  // 22
 459, 304, 161,  // 23
  38,  25,  14,  // 24
 453, 296, 175,  // 25
 225, 146,  91,  // 26
 149,  96,  63,  // 27
 111,  71,  49,  // 28
  63,  40,  29,  // 29
  73,  46,  35,  // 30
 435, 272, 217,  // 31
 108,  67,  56,  // 32
  13,   8,   7,  // 33
 213, 130, 119,  // 34
 423, 256, 245,  // 35
   5,   3,   3,  // 36
 281, 173, 162,  // 37
 141,  89,  78,  // 38
 283, 183, 150,  // 39
  71,  47,  36,  // 40
 285, 193, 138,  // 41
  13,   9,   6,  // 42
  41,  29,  18,  // 43
  36,  26,  15,  // 44
 289, 213, 114,  // 45
 145, 109,  54,  // 46
 291, 223, 102,  // 47
  73,  57,  24,  // 48
 293, 233,  90,  // 49
  21,  17,   6,  // 50
 295, 243,  78,  // 51
  37,  31,   9,  // 52
  27,  23,   6,  // 53
 149, 129,  30,  // 54
 299, 263,  54,  // 55
  75,  67,  12,  // 56
  43,  39,   6,  // 57
 151, 139,  18,  // 58
 303, 283,  30,  // 59
  38,  36,   3,  // 60
 305, 293,  18,  // 61
 153, 149,   6,  // 62
 307, 303,   6,  // 63
   1,   1,   0,  // 64
 101, 105,   2,  // 65
  49,  53,   2,  // 66
  95, 107,   6,  // 67
  23,  27,   2,  // 68
  89, 109,  10,  // 69
  43,  55,   6,  // 70
  83, 111,  14,  // 71
   5,   7,   1,  // 72
 172, 181,  37,  // 73
  97,  76,  22,  // 74
  72,  41,  17,  // 75
 119,  47,  29,  // 76
   4,   1,   1,  // 77
   4,   1,   1,  // 78
   4,   1,   1,  // 79
   4,   1,   1,  // 80
   4,   1,   1,  // 81
   4,   1,   1,  // 82
   4,   1,   1,  // 83
   4,   1,   1,  // 84
   4,   1,   1,  // 85
  65,  18,  17,  // 86
  95,  29,  26,  // 87
 185,  62,  53,  // 88
  30,  11,   9,  // 89
  35,  14,  11,  // 90
  85,  37,  28,  // 91
  55,  26,  19,  // 92
  80,  41,  29,  // 93
 155,  86,  59,  // 94
   5,   3,   2,  // 95
   5,   3,   2,  // 96
   5,   3,   2,  // 97
   5,   3,   2,  // 98
   5,   3,   2,  // 99
   5,   3,   2,  //100
   5,   3,   2,  //101
   5,   3,   2,  //102
   5,   3,   2,  //103
   5,   3,   2,  //104
   5,   3,   2,  //105
   5,   3,   2,  //106
   5,   3,   2,  //107
 305, 176, 119,  //108
 155,  86,  59,  //109
 105,  56,  39,  //110
  80,  41,  29,  //111
  65,  32,  23,  //112
  55,  26,  19,  //113
 335, 152, 113,  //114
  85,  37,  28,  //115
 115,  48,  37,  //116
  35,  14,  11,  //117
 355, 136, 109,  //118
  30,  11,   9,  //119
 365, 128, 107,  //120
 185,  62,  53,  //121
  25,   8,   7,  //122
  95,  29,  26,  //123
 385, 112, 103,  //124
  65,  18,  17,  //125
 395, 104, 101,  //126
   4,   1,   1,  //127
`;

let zhoufang_coeffs_fixed = `//right, down left, down, sum
      13,       0,       5,  //  0
 1300249,       0,  499250,  //  1
  213113,     287,   99357,  //  2
  351854,       0,  199965,  //  3
  801100,       0,  490999,  //  4
  784929,   49577,  459781,  //  5
  768758,   99155,  428564,  //  6
  752587,  148733,  397346,  //  7
  736416,  198310,  366129,  //  8
  720245,  247888,  334911,  //  9
  704075,  297466,  303694,  // 10
  649286,  275336,  280175,  // 11
  594498,  253207,  256656,  // 12
  539709,  231078,  233137,  // 13
  484921,  208949,  209619,  // 14
  430132,  186820,  186100,  // 15
  375344,  164691,  162581,  // 16
  320555,  142562,  139062,  // 17
  265767,  120433,  115544,  // 18
  210978,   98304,   92025,  // 19
  156190,   76175,   68506,  // 20
  101401,   54046,   44987,  // 21
   46613,   31917,   21469,  // 22
   46699,   31787,   21512,  // 23
   46786,   31657,   21555,  // 24
   46873,   31527,   21598,  // 25
   46960,   31397,   21641,  // 26
   47047,   31267,   21684,  // 27
   47134,   31137,   21727,  // 28
   47221,   31007,   21770,  // 29
   47308,   30877,   21813,  // 30
   47395,   30747,   21856,  // 31
   47482,   30617,   21900,  // 32
   47110,   31576,   21310,  // 33
   46739,   32536,   20721,  // 34
   46367,   33495,   20131,  // 35
   45996,   34455,   19542,  // 36
   45624,   35414,   18952,  // 37
   45253,   36374,   18363,  // 38
   44881,   37333,   17773,  // 39
   44510,   38293,   17184,  // 40
   44138,   39252,   16594,  // 41
   43767,   40212,   16005,  // 42
   43395,   41171,   15415,  // 43
   43024,   42131,   14826,  // 44
   42693,   42185,   15103,  // 45
   42362,   42239,   15380,  // 46
   42032,   42294,   15657,  // 47
   41701,   42348,   15934,  // 48
   41370,   42403,   16211,  // 49
   41040,   42457,   16488,  // 50
   40709,   42511,   16766,  // 51
   40378,   42566,   17043,  // 52
   40048,   42620,   17320,  // 53
   39717,   42675,   17597,  // 54
   39386,   42729,   17874,  // 55
   39056,   42783,   18151,  // 56
   38725,   42838,   18428,  // 57
   38394,   42892,   18706,  // 58
   38064,   42947,   18983,  // 59
   37733,   43001,   19260,  // 60
   37402,   43055,   19537,  // 61
   37072,   43110,   19814,  // 62
   36741,   43164,   20091,  // 63
   36411,   43219,   20369,  // 64
   36669,   44547,   18782,  // 65
   36927,   45875,   17196,  // 66
   37185,   47203,   15609,  // 67
   37444,   48531,   14023,  // 68
   37702,   49859,   12437,  // 69
   37960,   51187,   10850,  // 70
   38218,   52515,    9264,  // 71
   38477,   53843,    7678,  // 72
   38882,   53383,    7732,  // 73
   39287,   52924,    7786,  // 74
   39692,   52465,    7840,  // 75
   40097,   52006,    7894,  // 76
   40503,   51547,    7948,  // 77
   39923,   49367,   10707,  // 78
   39343,   47187,   13467,  // 79
   38763,   45007,   16227,  // 80
   38184,   42827,   18987,  // 81
   37604,   40647,   21746,  // 82
   37024,   38467,   24506,  // 83
   36444,   36287,   27266,  // 84
   35865,   34108,   30026,  // 85
   35690,   34387,   29921,  // 86
   35515,   34666,   29817,  // 87
   35340,   34945,   29713,  // 88
   35165,   35224,   29608,  // 89
   34991,   35503,   29504,  // 90
   34816,   35782,   29400,  // 91
   34641,   36061,   29295,  // 92
   34466,   36340,   29191,  // 93
   34291,   36619,   29087,  // 94
   34117,   36899,   28983,  // 95
   34309,   36634,   29054,  // 96
   34501,   36370,   29126,  // 97
   34694,   36106,   29198,  // 98
   34886,   35841,   29269,  // 99
   35079,   35577,   29341,  //100
   35271,   35313,   29413,  //101
   35464,   35049,   29485,  //102
   31666,   31801,   26530,  //103
   27869,   28553,   23575,  //104
   24071,   25305,   20621,  //105
   20274,   22057,   17666,  //106
   16477,   18810,   14712,  //107
   19853,   22638,   17506,  //108
   23230,   26467,   20301,  //109
   26606,   30296,   23095,  //110
   29983,   34125,   25890,  //111
   33360,   37954,   28685,  //112
   33487,   37828,   28683,  //113
   33614,   37702,   28682,  //114
   33741,   37576,   28680,  //115
   33869,   37450,   28679,  //116
   33996,   37324,   28678,  //117
   34123,   37198,   28676,  //118
   34250,   37072,   28675,  //119
   34378,   36947,   28673,  //120
   34505,   36821,   28672,  //121
   34632,   36695,   28671,  //122
   34759,   36569,   28669,  //123
   34887,   36443,   28668,  //124
   35014,   36317,   28666,  //125
   35141,   36191,   28665,  //126
   35269,   36066,   28664,  //127
`;

function customCoeffs() {
  let coefficient = gIdV("coefficientsInput");

  let noComments = coefficient.replace(/\/\/.*$/gm, "");

  let coeffsArray = noComments
    .split(",")
    .map((str) => str.trim())
    .filter((str) => str !== "")
    .map(Number);

  let isFloat = coeffsArray.some((n) => n % 1 !== 0);

  function getDecimalPrecision(num) {
    if (num % 1 === 0) return 0;
    let decimalPart = num.toString().split(".")[1] || "";
    return decimalPart.length;
  }

  let float32 = 3.4028235e38;

  let isFloat32 = coeffsArray.some((num) => {
    let precision = getDecimalPrecision(num);
    return precision <= 7 && abs(num) <= float32 && abs(num) >= -float32;
  });

  let is8bit = coeffsArray.every((n) => n >= -128 && n <= 127);
  let is16bit = coeffsArray.every((n) => n >= -32768 && n <= 32767);
  let is32bit = coeffsArray.every((n) => n >= -2147483648 && n <= 2147483647);

  if (isFloat) {
    if (isFloat32) {
      return new Float32Array(coeffsArray);
    } else {
      return new Float64Array(coeffsArray);
    }
  }

  if (is8bit) {
    return new Int8Array(coeffsArray);
  } else if (is16bit) {
    return new Int16Array(coeffsArray);
  } else if (is32bit) {
    return new Int32Array(coeffsArray);
  }

  return new Int32Array(coeffsArray);
}

/*
# Credits

*https://en.wikipedia.org/wiki/Error_diffusion*
*https://pippin.gimp.org/a_dither/*
*https://potch.me/demos/playdither*
*https://github.com/robertkist/libdither*
*https://app.dithermark.com*
*https://perso.liris.cnrs.fr/ostrom/publications/pdf/SIGGRAPH01_varcoeffED.pdf*
*https://observablehq.com/@jobleonard/variable-coefficient-dithering*
*http://research.cs.wisc.edu/graphics/Courses/559-f2002/lectures/cs559-5.ppt*
*http://caca.zoy.org/study*
*/
