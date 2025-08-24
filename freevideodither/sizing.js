function adjustCanvasSize() {
  cvs.width = video.videoWidth;
  cvs.height = video.videoHeight;
  printLog(`Canvas size: ${cvs.width}x${cvs.height}`);
}

function changecanvasSize() {
    let width = gId("canvasWidth").value,
    height = gId("canvasHeight").value;
    if (video.playing) {
      if (width && height) {
        cvs.width = parseInt(width, 10);
        cvs.height = parseInt(height, 10);
      } else {
        alert("The width and height cannot be blank or negative.");
      }
    }
    if (video.paused || video.ended) {
      if (width && height) {
        cvs.width = parseInt(width, 10);
        cvs.height = parseInt(height, 10);
        v();
      } else {
        alert("The width and height cannot be blank or negative.");
      }
    }
  }

  function changeVideoSize() {
    let width = gId("videoWidth").value,
    height = gId("videoHeight").value,
    video = gId("video");
    if (width && height) {
      video.width = width;
      video.height = height;
    } else {
      alert("The width and height cannot be blank or negative.");
    }
  }

  const canvasSizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      const { width, height } = entry.contentRect;

      cvs.width = width;
      cvs.height = height;

      w = width, h = height;
      sqSz = w * h;
    }
  }); 

  canvasSizeObserver.observe(canvas);
