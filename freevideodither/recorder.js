const option = {
  mimeType: "video/mp4; codec=vp9", //see freevideodither.glitch.com/avc1_options.txt for custom avc1 options
  videoBitsPerSecond: 100000000, //media recorder bitrate
  frameRate: 60,
};

const mediaRecorder = new MediaRecorder(
  cvsStream,
  option
);

//Main

mediaRecorder.ondataavailable = (e) => {
  chunks.push(e.data);
  printLog("chunks pushed");
};

mediaRecorder.onstop = () => {
  const blob = new Blob(chunks);
  const recordedVideoUrl = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.download = "video.webm";
  downloadLink.href = recordedVideoUrl;
  downloadLink.click();
  printLog(`Download link: ${downloadLink}`);
};