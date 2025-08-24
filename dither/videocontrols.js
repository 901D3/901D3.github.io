document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    var activeElement = document.activeElement.tagName.toLowerCase();
    if (activeElement !== "input" && activeElement !== "textarea") {
      event.preventDefault();
      togglePlayPause();
    }
  }
});

function togglePlayPause() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
function setPlaybackSpeed() {
  var video = gId("video");
  var speed = gId("speedInput").value;
  video.playbackRate = parseFloat(speed);
  printLog("Playback speed: " + video.playbackRate);
}

document.addEventListener('keydown', function(event) {
  const activeElement = document.activeElement;
  if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
      switch (event.key) {
        case 'ArrowLeft': // rewind 5 seconds
            event.preventDefault();
            video.currentTime = max(0, video.currentTime - 5);
            break;
        case 'ArrowRight': // fast forward 5 seconds
            event.preventDefault();
            video.currentTime = min(video.duration, video.currentTime + 5);
            break;
        case 'KeyJ':
            event.preventDefault(); // rewind 10 seconds
            video.currentTime = max(0, video.currentTime - 10);
            break;
        case 'KeyK':
            event.preventDefault();
            togglePlayPause();
            break;
        case 'KeyL': // fast forward 10 seconds
            event.preventDefault();
            video.currentTime = min(video.duration, video.currentTime + 10);
            break;
        case '0':
            event.preventDefault();
            video.currentTime = 0;
        break;
      }
  }
});