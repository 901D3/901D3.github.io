const d = {
  "matrixthreshold": bayer,
  "arithmeticcustom": arithmeticCustom,
  "errdiffscustom": errDiffsCustom,
  "varerrdiffscustom": varErrDiffsCustom,
};

function pr() {
  process();
  if (video.paused || video.ended) return;
  setTimeout(() => {pr()}, 0);
}

function process() {
  ctx.drawImage(video, 0, 0, cvs.width, cvs.height);
  let m = gIdV("dither"), f = ctx.getImageData(0, 0, cvs.width, cvs.height);
  if (d[m]) d[m](f);
  ctx.putImageData(f, 0, 0);
  if (t) frameCounter();
}

function frameCounter() {
  frm++;
  let esT = (performance.now() - stT) / 1000;
  let avgFps = frm / esT;
  let dlT = (performance.now() - lsUpdT) / 1000;
  let crFps = dlT > 0 ? 1 / dlT : 0;
  lsUpdT = performance.now();
  if (performance.now() - lLT >= 1000) {
    printLog(`elapsed: ${esT.toString().padEnd(22)} | processed: ${frm.toString().padEnd(22)} | AvgFps: ${avgFps.toString().padEnd(22)} | Fps: ${crFps.toString().padEnd(22)} | `);
    lLT = performance.now();
  }
}

gId("showTelemetries").addEventListener("change", function (e) {
  t = e.target.checked;
});

video.addEventListener("play", function() {
  frm = 0;
  stT = performance.now();
  lsUpdT = stT;
  lLT = stT;
  pr();
});

video.addEventListener("seeking", process);