var startRec = gId("startRecording");
var stopRec = gId("stopRecording");
var pauseRec = gId("pauseRecording");
var resumeRec = gId("resumeRecording");
var videoFile;
var isProcessing = false;
var isRecording = false;
video.addEventListener("loadedmetadata", adjustCanvasSize);

function ranInt(a, b) {
  return floor(a + random() * (b - a));
}
