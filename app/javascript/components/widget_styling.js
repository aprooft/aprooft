const widgetStyling = () => {
  const sizeOptions = document.querySelectorAll(".size-option");
  sizeOptions.forEach((sizeOption) => {
    sizeOption.addEventListener("click", (e) => {
      switch (sizeOption.id) {
        case "size-option-big":
          document.body.style.setProperty("--widget-width", "460px");
          document.body.style.setProperty("--widget-height", "600px");
          break;
        case "size-option-medium":
          document.body.style.setProperty("--widget-width", "380px");
          document.body.style.setProperty("--widget-height", "520px");
          break;
        case "size-option-small":
          document.body.style.setProperty("--widget-width", "300px");
          document.body.style.setProperty("--widget-height", "440px");
          break;
      }
    })
  })

  //fonts section
  const fontSizeSlider = document.getElementById("font-size-slider");
  const fontColor = document.querySelector(".basic-color-picker");
  const fontStyle = document.getElementById("select-font");

  fontColor.addEventListener('change', () => {
    document.body.style.setProperty("--widget-text-color", fontColor.value);
  })

  fontSizeSlider.addEventListener("input", e => {
    document.body.style.setProperty("--widget-font-size", `${e.target.value}px`);
  })

  fontStyle.addEventListener("input", (e) => {
    document.body.style.setProperty("--widget-font-family", `${e.target.value}, sans-serif`);
  })

  //colors section
  const topbarColor = document.getElementById("top-bar-color");
  const highlightColor = document.getElementById("highlight-color");

  topbarColor.addEventListener('change', () => {
    document.body.style.setProperty("--widget-topbar-color", topbarColor.value);
  })

  highlightColor.addEventListener('change', () => {
    document.body.style.setProperty("--widget-highlight-color", highlightColor.value);
  })

  // background section
  const IroColorPicker = document.querySelector(".IroColorPicker");
  const hexInput = document.getElementById("hexInput");

  IroColorPicker.addEventListener('click', () => {
    document.body.style.setProperty("--widget-background-color", hexInput.value);
  })

}

export { widgetStyling }