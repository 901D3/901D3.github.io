/*
//dither

const checkbox = document.getElementById("creativeModeCheckbox");
const scriptEditor = document.getElementById("scriptEditor");
const editableScript = document.getElementById("editableScript");
const ogScript = document.getElementById("ogScript");

scriptEditor.value = editableScript.textContent;

checkbox.addEventListener("change", function () {
  if (this.checked) {
    editableScript.type = "text/javascript";
    ogScript.type = "application/json";
    scriptEditor.style.display = "block";
    editableScript.style.display = "none";
    video.pause();
    printLog("Video paused");
  } else {
    scriptEditor.style.display = "none";
    editableScript.type = "application/json";
    ogScript.type = "text/javascript";
    video.pause();
    printLog("Video paused");
  }
});

function applyJsCode() {
  var text = document.getElementById("scriptEditor").value;
  document.getElementById("editableScript").innerHTML = text;
}

function runCreativeScript() {
  if (checkbox.checked) {
    const scriptContent = scriptEditor.value;
    eval(scriptContent); // Be cautious with eval
  }
}
*/




//custom media recorder

const mediaRecorderCkbx = document.getElementById("mediaRecorderCkbx");
const mediaRecorderScriptEditor = document.getElementById(
  "mediaRecorderScriptEditor"
);
const editableMediaRecorderScript = document.getElementById(
  "editableMediaRecorderScript"
);
const ogMediaRecorderScript = document.getElementById(
  "ogMediaRecorderScript"
);

mediaRecorderScriptEditor.value = editableMediaRecorderScript.textContent;

mediaRecorderCkbx.addEventListener("change", function () {
  if (this.checked) {
    editableMediaRecorderScript.type = "text/javascript";
    ogMediaRecorderScript.type = "text/plain";
    mediaRecorderScriptEditor.style.display = "block";
    editableMediaRecorderScript.style.display = "none";
    video.pause();
    printLog("Video paused");
  } else {
    mediaRecorderScriptEditor.style.display = "none";
    editableMediaRecorderScript.type = "text/plain";
    ogMediaRecorderScript.type = "text/javascript";
    video.pause();
  }
});

function applyMRCode() {
  var text = document.getElementById("mediaRecorderScriptEditor").value;
  document.getElementById("editableMediaRecorderScript").innerHTML = text;
}

function runCreativeScript() {
  if (mediaRecorderCkbx.checked) {
    const scriptContent = mediaRecorderScriptEditor.value;
    eval(scriptContent); // Be cautious with eval
  }
}
