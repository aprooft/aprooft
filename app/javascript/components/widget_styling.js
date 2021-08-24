import { showExistStyles } from "./showexiststyles";

const widgetStyling = () => {
  let styles = {};
  const styleUrl = window.location.href.split("/").slice(0, -1).join("/") + '/styles';

  function setStyles(key, value){
    styles[key] = value;
    fetch(styleUrl, {
      method: 'POST',
      body: JSON.stringify({styles: styles}),
      credentials: 'same-origin',
      headers: {
          'content-type': 'application/json'
      },
      mode: 'cors',
    }).then(response => {
      response 
        .json()
        .then(res => {
          console.log(res);
        });
    })           
  }  

  showExistStyles(styleUrl);

  const sizeOptions = document.querySelectorAll(".size-option");
  sizeOptions.forEach((sizeOption) => {
    sizeOption.addEventListener("click", (e) => {
      switch (sizeOption.id) {
        case "size-option-big":
          document.body.style.setProperty("--widget-width", "460px");
          document.body.style.setProperty("--widget-height", "600px");
          setStyles("widgetWidth", "460px");
          setStyles("widgetHeight", "600px");
          break;
        case "size-option-medium":
          document.body.style.setProperty("--widget-width", "380px");
          document.body.style.setProperty("--widget-height", "520px");
          setStyles("widgetWidth", "380px");
          setStyles("widgetHeight", "520px");
          break;
        case "size-option-small":
          document.body.style.setProperty("--widget-width", "300px");
          document.body.style.setProperty("--widget-height", "440px");
          setStyles("widgetWidth", "300px");
          setStyles("widgetHeight", "440px");
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
    setStyles("widgetFontColor", fontColor.value);
  })

  fontSizeSlider.addEventListener("input", e => {
    document.body.style.setProperty("--widget-font-size", `${e.target.value}px`);
    setStyles("widgetFontSize", `${e.target.value}px`);
  })

  fontStyle.addEventListener("input", (e) => {
    document.body.style.setProperty("--widget-font-family", `${e.target.value}, sans-serif`);
    setStyles("widgetFontFamily", `${e.target.value}, sans-serif`);
  })

  //colors section
  const topbarColor = document.getElementById("top-bar-color");
  const highlightColor = document.getElementById("highlight-color");

  topbarColor.addEventListener('change', () => {
    document.body.style.setProperty("--widget-topbar-color", topbarColor.value);
    setStyles("widgetTopbarColor", topbarColor.value);
  })

  highlightColor.addEventListener('change', () => {
    document.body.style.setProperty("--widget-highlight-color", highlightColor.value);
    setStyles("widgetHighlightColor", highlightColor.value);
  })

  // background section
  const IroColorPicker = document.querySelector(".IroColorPicker");
  const hexInput = document.getElementById("hexInput");

  IroColorPicker.addEventListener('click', () => {
    document.body.style.setProperty("--widget-background-color", hexInput.value);
    setStyles("widgetBgColor", hexInput.value);
  })

  // layout section
  const layouts = ['list', 'grid', 'masonry', 'slider'];
  
  for (let layout of layouts){
    document.getElementById(layout).addEventListener('click', () => {
      window.setGlobalWidgetLayout(layout);
      setStyles("widgetLayout", layout);
    });
  }
}

export { widgetStyling }