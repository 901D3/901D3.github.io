var locales = {
  title: "Free Video Dithering",
  subtitle: "A tool for dithering video",

  upload_video: "Upload video files",
  paste_video_link: "Paste video link",
  link_filter: "Remove Filter",
  recorder: "Recorder",

  start: "Start",
  stop: "Stop",
  pause: "Pause",
  resume: "Resume",

  video_settings_title: "Video",
  dither_settings_title: "Dither",
  canvas_settings_title: "Canvas size",
  width: "Width",
  height: "Height",
  video_size_change: "Change video size",
  play: "",
  pause: "",
  video_speed: "Playback Speed",
  audio_volume: "Volume",
  none: "none",
  matrix_thresh_optgrout: ":Matrix",
  arith_optgrout: ":Arithmetic",
  errdiffs_optgrout: ":Error Diffusion",
  matrix_thresh: "Matrix Threshhold",
  matrix_thresh: "Matrix Threshhold",
  arithmetic: "Arithmetic",
  errdiffs: "Error Diffusion",
  varerrdiffs: "Variable Error Diffusion",
  preset_name_input_placeholder: "Enter preset name",
  save_preset: "Save as User Preset",
  del_preset: "Delete Selected Presets",
  canvas_size_change: "Change canvas size",
  pixelated_render: "Pixelated Rendering",
  canvas_desync: "Canvas Desynchronize",
  refresh_canvas: "Refresh canvas",
  canvas_fullscreen: "Canvas Fullscreen",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
  //video_speed: "",
};

var $locale = (function () {
  function _updText(i, id, newKey) {
    const el = document.querySelector(
      `[data-text="${i}"][data-text-id="${id}"]`
    );
    if (!el) return;

    el.setAttribute("data-text", newKey);

    const keyName = newKey.replace(/^\$/, "");
    if (locales[keyName]) {
      el.innerHTML = locales[keyName];
    }
  }
  function _updTextDirty(i, id, newText) {
    const el = document.querySelector(`[data-key="${i}"][data-id="${id}"]`);
    if (!el) return;

    el.dataset.text = newText;
    el.innerText = newText;
  }
  return {
    updText: _updText,
    updTextDirty: _updTextDirty,
  };
})();

(function () {
  let keys = Object.keys(locales);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let label = document.querySelector(`[data-text="$${key}"]`);
    if (!label) continue;

    label.innerText = locales[key];
  }

  gId(
    "console"
  ).innerHTML = `Check out the source code!<a href="https://github.com/901D3/freevideodither" target="_blank">
github.com/901D3/freevideodither</a>
View avc1 options for custom MediaRecorder settings <a href="/avc1_options.txt" target="_blank">
avc1_options.txt</a>`;
})();
