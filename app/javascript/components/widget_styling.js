const widgetStyling = () => {
  const widgetDev = document.querySelector(".widget-dev")

  const sizeOptions = document.querySelectorAll(".size-option")
  sizeOptions.forEach((sizeOption) => {
    sizeOption.addEventListener("click", (e) => {
      switch (sizeOption.id) {
        case "size-option-big":
          widgetDev.style.width = "460px";
          widgetDev.style.height = "600px";
          break;
        case "size-option-medium":
          widgetDev.style.width = "380px";
          widgetDev.style.height = "520px";
          break;
        case "size-option-small":
          widgetDev.style.width = "300px";
          widgetDev.style.height = "440px";
          break;
      }
    })
  })

  //fonts section
  const fontSizeSlider = document.getElementById("font-size-slider");
  const fontColor = document.querySelector(".basic-color-picker");
  const fontStyle = document.getElementById("select-font");

  fontColor.addEventListener('change', () => {
    const youtubeTitles = document.querySelectorAll(".list-info-title-insidebox");
    youtubeTitles.forEach((youtubeTitle) => {
      youtubeTitle.style.color = fontColor.value;
    })
  })

  fontSizeSlider.addEventListener("input", e => {
    const youtubeTitles = document.querySelectorAll(".list-info-title-insidebox");
    youtubeTitles.forEach((youtubeTitle) => {
      youtubeTitle.style.fontSize = `${e.target.value}px`;
    });
  })

  fontStyle.addEventListener("input", (e) => {
    const youtubeTitles = document.querySelectorAll(".list-info-title-insidebox");
    youtubeTitles.forEach((youtubeTitle) => {
      youtubeTitle.style.fontFamily = `${e.target.value}, sans-serif`;
    });
  })

  //colors section
  const topbarColor = document.getElementById("top-bar-color");
  const topbarDev = document.querySelector(".topbar-dev");
  const highlightColor = document.getElementById("highlight-color");
  const widgetNavBtnActive = document.querySelector(".widget-nav-btn.active");
  console.log(widgetNavBtnActive)

  topbarColor.addEventListener('change', () => {
    // topbarDev.style.backgroundColor = topbarColor.value;
    // setHighlight();
    document.body.style.setProperty("--widget-topbar-color", topbarColor.value);
  })

  highlightColor.addEventListener('change', () => {
    // if (topbarDev.style.backgroundColor === "") {
    //   topbarDev.style.backgroundColor = "#11101D";
    // }
    // setHighlight();
    // widgetNavBtnActive.style.borderBottom = `10px solid ${highlightColor.value}`
    document.body.style.setProperty("--widget-highlight-color", highlightColor.value);
  })

  // const setHighlight = () => {
  //   widgetNavBtnActive.style.background =
  //     `linear-gradient(0deg, ${topbarDev.style.backgroundColor} 30%, ${highlightColor.value} 90%)`
  // }

  // background section
  const IroColorPicker = document.querySelector(".IroColorPicker");
  const hexInput = document.getElementById("hexInput");

  IroColorPicker.addEventListener('click', (e) => {
    widgetDev.style.backgroundColor = `${hexInput.value}`;
  })

}

export { widgetStyling }