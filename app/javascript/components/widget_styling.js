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

  //colors section
  const topbarColor = document.getElementById("top-bar-color");
  const topbarDev = document.querySelector(".topbar-dev");
  const highlightColor = document.getElementById("highlight-color");
  const widgetNavBtnActive = document.querySelector(".widget-nav-btn.active");
  console.log(widgetNavBtnActive)
  topbarDev.style.backgroundColor = "#11101D"

  topbarColor.addEventListener('change', () => {
    topbarDev.style.backgroundColor = topbarColor.value;
  })

  highlightColor.addEventListener('change', () => {
    widgetNavBtnActive.style.background =
      `linear-gradient(0deg, ${topbarDev.style.backgroundColor.value} 30%, ${highlightColor.value} 90%)`
    widgetNavBtnActive.style.borderBottom = `10px solid ${highlightColor.value}`
  })

  // background section
  const IroColorPicker = document.querySelector(".IroColorPicker");
  const hexInput = document.getElementById("hexInput");

  IroColorPicker.addEventListener('click', (e) => {
    widgetDev.style.backgroundColor = `${hexInput.value}`;
  })

}

export { widgetStyling }