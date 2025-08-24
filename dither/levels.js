dropdown.addEventListener("change", function () {
  switch (this.value) {
    case "matrixthreshold":
      hideElements();
      setDisp("lvls", "block");
      setDisp("randMatDisp", "block");
      setDisp("matrixDisp", "block");
      setDisp("bnDisp", "block");
      setDisp("errDiffsDisp", "block");
      setDisp("linearDisp", "block");
      break;
    case "arithmeticcustom":
      hideElements();
      setDisp("lvls", "block");
      setDisp("halftoneLvls", "block");
      setDisp("arithmeticDisp", "block");
      setDisp("arithInput", "block");
      setDisp("linearDisp", "block");
      break;
    case "varerrdiffscustom":
      hideElements();
      setDisp("lvls", "block");
      setDisp("errLvls", "block");
      setDisp("serpentineDisp", "block");
      setDisp("buffDisp", "block");
      setDisp("varerrdiffsDisp", "block");
      setDisp("coeffsInput", "block");
      setDisp("linearDisp", "block");
      if (gId("buff").checked) {
        setDisp("bufferDisp", "block");
      } else {
        setDisp("bufferDisp", "none");
      }
      break;
    case "errdiffscustom":
      hideElements();
      setDisp("lvls", "block");
      setDisp("errLvls", "block");
      setDisp("errorDiffsDisp", "block");
      setDisp("errDiffsDisp", "block");
      setDisp("serpentineDisp", "block");
      setDisp("linearDisp", "block");
      setDisp("buffDisp", "block");
      if (gId("buff").checked) {
        setDisp("bufferDisp", "block");
      } else {
        setDisp("bufferDisp", "none");
      }
      break;
    case "halftone":
      hideElements();
      setDisp("lvls", "block");
      setDisp("halftoneLvls", "block");
      setDisp("linearDisp", "block");
      break;
    case "dotdiffs":
      hideElements();
      setDisp("lvls", "block");
      setDisp("errLvls", "block");
      break;
    default:
      hideElements();
  }
});

gId("volumeSlider").addEventListener("input", () => {
  sync("volumeSlider", "volumeInput", "0");
});
gId("volumeInput").addEventListener("input", () => {
  sync("volumeSlider", "volumeInput", "1");
});

gId("bnSigmaRange").addEventListener("input", () => {
  sync("bnSigmaRange", "bnSigma", "0");
});
gId("bnSigma").addEventListener("input", () => {
  sync("bnSigmaRange", "bnSigma", "1");
});

//RGB

let sliders = ["rLvlsRange", "gLvlsRange", "bLvlsRange"];

sliders.forEach((sliderId) => {
  let slider = gId(sliderId);
  slider.addEventListener("touchstart", (event) => event.preventDefault());
  slider.addEventListener("touchmove", (event) => event.preventDefault());
});
