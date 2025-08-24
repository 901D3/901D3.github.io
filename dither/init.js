function gId(i) {
  return document.getElementById(i);
}

function gIdV(i) {
  return document.getElementById(i).value;
}

function qSl(i) {
  return document.querySelector(i);
}

function qSlA(i) {
  return document.querySelectorAll(i);
}

function pFl(i) {
  return parseFloat(i);
}

function pIn(i) {
  return parseInt(i);
}

function lwC(i) {
  return i.toLowerCase();
}

function setDisp(i, s) {
  return (gId(i).style.display = s);
}

function defV(v1, v2, vx) {
  //v1 for input value, v2 for default value, vx for returning v2 if v1 = vx
  if (isNaN(vx) || !isFinite(vx)) {
    vx = 1;
  }
  if (Number.isNaN(v1) || !isFinite(v1) || v1 === vx) {
    printLog("Returned default value of " + v2);
    return v2;
  } else {
    return v1;
  }
}

let A = 1.7976931348623157e308,
  B = 5e-324;

let elementsToHide = [
  "lvls",
  "errLvls",
  "halftoneLvls",
  "randMatDisp",
  "linearDisp",
  "serpentineDisp",
  "buffDisp",
  "errorDiffsDisp",
  "errDiffsDisp",
  "arithmeticDisp",
  "arithInput",
  "varerrdiffsDisp",
  "coeffsInput",
  "matrixDisp",
  "bnDisp",
  "bufferDisp",
];

function hideElements() {
  elementsToHide.forEach((id) => setDisp(id, "none"));
}

var cvs = gId("canvas"),
  ctx = cvs.getContext("2d", {
    desynchronized: desyncOpt,
  }),
  bnCanvas = gId("blueNoiseCanvas"),
  bnCtx = bnCanvas.getContext("2d"),
  video = gId("video"),
  dropdown = gId("dither"),
  dropdownArith = gId("arithmetic"),
  dropdownMatrix = gId("matrix"),
  dropdownErrDiffs = gId("errorDiffs"),
  dropdownVarerrdiffs = gId("varerrdiffs"),
  cvsStream = cvs.captureStream(),
  volumeSlider = gId("volumeSlider"),
  volumeInput = gId("volumeInput"),
  chunks = [],
  blob = null,
  bMat = [],
  matSz,
  matX,
  matY,
  m,
  errDiffsCode = "",
  divFtr = "",
  isProcessing = false,
  frm = 0,
  stT = 0,
  lsUpdT = 0,
  lLT = 0,
  desyncOpt = false,
  t = false,
  custom_coeffs,
  w,
  h,
  sqSz,
  lvls,
  errLvls,
  mul = 4,
  x = 0,
  y = 0,
  c = 0,
  i = 0,
  j = 0,
  wt = [7, 3, 5, 1],
  offs = [],
  offslength,
  rnd,
  linr,
  serp,
  buff,
  div = wt.reduce((sum, v) => sum + (v ?? 0), 0),
  lvls = [0, 0, 0],
  errLvls = [0, 0, 0],
  {
    floor,
    ceil,
    round,
    trunc,
    sign,
    abs,
    exp,
    log,
    log2,
    log10,
    pow,
    random,
    min,
    max,
    sqrt,
    cbrt,
    sin,
    cos,
    tan,
    asin,
    acos,
    atan,
    atan2,
    sinh,
    cosh,
    tanh,
    asinh,
    acosh,
    atanh,
    E,
    PI,
    SQRT2,
    SQRT1_2,
    LN2,
    LN10,
    LOG2E,
    LOG10E,
  } = Math,
  PHI = (1 + sqrt(5)) / 2;
INFI = Infinity;

ctx.imageSmoothingEnabled = false;

Object.defineProperty(HTMLMediaElement.prototype, "playing", {
  get: function () {
    return !!(
      this.currentTime > 0 &&
      !this.paused &&
      !this.ended &&
      this.readyState > 2
    );
  },
});

let logEntries = [];

window.addEventListener(
  "touchstart",
  (e) => {
    if (
      e.touches.length === 1 &&
      (e.touches[0].clientX < 50 ||
        e.touches[0].clientX > window.innerWidth - 50)
    ) {
      e.preventDefault();
    }
  },
  { passive: false }
);

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function printLog(message) {
  let console = gId("console");
  let maxLogEntries = 500;
  let urlRegex = /https?:\/\/[^\s]+/g;
  let codeRegex = /`([^`]+)`/g;

  let messageWithLinks = escapeHTML(message).replace(urlRegex, function (url) {
    return `<a href="${url}" target="_blank">${url}</a>`;
  });

  messageWithLinks = messageWithLinks.replace(codeRegex, function (_, code) {
    return `<code style="background:#eee;padding:2px 4px;border-radius:4px;font-family:monospace">${code}</code>`;
  });

  logEntries.push(messageWithLinks);

  if (logEntries.length > maxLogEntries) {
    logEntries.shift();
  }

  let logEntry = document.createElement("div");
  logEntry.innerHTML = messageWithLinks + "<br>";
  console.appendChild(logEntry);

  if (console.children.length > maxLogEntries) {
    console.removeChild(console.firstChild);
  }

  console.scrollTop = console.scrollHeight;
}

gId("randMat").addEventListener("change", function () {
  rnd = gId("randMat").checked;
});

gId("linear").addEventListener("change", function () {
  linr = gId("linear").checked;
});

gId("serp").addEventListener("change", function () {
  serp = gId("serp").checked;
});

gId("buff").addEventListener("change", function () {
  buff = gId("buff").checked;
  mul = buff ? 3 : 4;
});

function RANDDD(seed) {
  seed = (seed >> (PI * seed)) ^ (seed * 12902091);
  return seed;
}

function hash(seed, a) {
  let x = (seed ^ a) >>> 0;
  x = (x ^ (x >> 15)) * 0x85ebca6b;
  x = (x ^ (x >> 13)) * 0xc2b2ae35;
  return (x ^ (x >> 16) ^ 0) / 0xffffffff;
}

let linearLUT = new Float32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i / 255;
  linearLUT[i] =
    (c <= 0.04045 ? c / 12.92 : pow((c + 0.055) / 1.055, 2.4)) * 255;
}

["r", "g", "b"].forEach((ch, idx) => {
  const input = gId(ch + "LvlsInput");
  const slider = gId(ch + "ErrLvlsRange");

  function update(val) {
    errLvls[idx] = parseFloat(val);
    input.value = val;
    slider.value = val;
  }

  input.addEventListener("input", () => update(input.value));
  slider.addEventListener("input", () => update(slider.value));

  input.value = errLvls[idx];
  slider.value = errLvls[idx];
});

["R", "G", "B"].forEach((ch, idx) => {
  let lowerCase = lwC(ch);
  const input = gId("err" + ch);
  const slider = gId(lowerCase + "ErrLvlsRange");

  function update(val) {
    errLvls[idx] = parseFloat(val);
    input.value = val;
    slider.value = val;
  }

  input.addEventListener("input", () => update(input.value));
  slider.addEventListener("input", () => update(slider.value));

  input.value = errLvls[idx];
  slider.value = errLvls[idx];
});

let bnRunning = false;

gId("bnSeed").value = RANDDD(random() * 1000);

function gen() {
  if (bnRunning) return;
  bnRunning = true;
  let width = pIn(gIdV("bnWidth")),
    height = pIn(gIdV("bnHeight")),
    seed = pFl(gIdV("bnSeed")) || random() * 1000,
    maxPoints = pIn(gIdV("maxPoints")),
    swLoopLimit = pIn(gIdV("swLoopLimit")),
    bnSqSz = width * height;

  bnCanvas.width = pIn(gIdV("bnWidth"));
  bnCanvas.height = pIn(gIdV("bnHeight"));
  imageData = bnCtx.getImageData(0, 0, width, height);
  px = imageData.data;

  startTime = performance.now();
  blueNoise = blueNoiseGen(
    pFl(gIdV("bnSigma")),
    maxPoints,
    swLoopLimit,
    width,
    height,
    seed
  );

  let a = 0;
  for (i = 0; i < bnSqSz; i++) {
    v = gId("bnInvert").checked
      ? 256 - floor((blueNoise[a++] / bnSqSz) * 256)
      : floor((blueNoise[a++] / bnSqSz) * 256);
    p = i * 4;
    px[p] = px[p + 1] = px[p + 2] = v;
    px[p + 3] = 255;
  }

  bnCtx.putImageData(imageData, 0, 0);
  endTime = performance.now();
  printLog("Generated in " + (endTime - startTime) + "ms");
  bnRunning = false;
}

gId("bnGen").addEventListener("click", gen);

let bigContainer = document.getElementsByClassName("bigContainer")[0];

if (bigContainer) {
  let observer = new ResizeObserver(() => {
    document.body.style.minWidth = bigContainer.offsetWidth + "px";
  });
  observer.observe(bigContainer);
}

gId(
  "console"
).innerHTML = `Check out the source code!<a href="https://github.com/901D3/freevideodither" target="_blank">
github.com/901D3/freevideodither</a>
View avc1 options for custom MediaRecorder settings <a href="/avc1_options.txt" target="_blank">
avc1_options.txt</a>`;
