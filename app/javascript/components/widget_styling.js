const widgetStyling = () => {
  const widgetDev = document.querySelector(".widget-dev")
  console.log(widgetDev)


  const sizeOptions = document.querySelectorAll(".size-option")
  console.log(sizeOptions)
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

}

export { widgetStyling }