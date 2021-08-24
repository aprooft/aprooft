function showExistingStyles(url){
    fetch(url, {
      mode: "cors",
    })
      .then(response => {
        response
          .json()
          .then(res => {
              if (res["styles"]["widgetWidth"]) {
                document.body.style.setProperty("--widget-width", res["styles"]["widgetWidth"]);
              }
              if (res["styles"]["widgetHeight"]) {
                document.body.style.setProperty("--widget-height", res["styles"]["widgetHeight"]);
              }
              if (res["styles"]["widgetLayout"]) {
                window.setGlobalWidgetLayout(res["styles"]["widgetLayout"]);
              }
              if (res["styles"]["widgetTopbarColor"]) {
                document.body.style.setProperty("--widget-topbar-color", res["styles"]["widgetTopbarColor"]);
              }
              if (res["styles"]["widgetHighlightColor"]) {
                document.body.style.setProperty("--widget-highlight-color", res["styles"]["widgetHighlightColor"]);
              }
              if (res["styles"]["widgetBgColor"]) {
                document.body.style.setProperty("--widget-background-color", res["styles"]["widgetBgColor"]);
              }
              if (res["styles"]["widgetFontColor"]) {
                document.body.style.setProperty("--widget-text-color", res["styles"]["widgetFontColor"]);
              }
              if (res["styles"]["widgetFontSize"]) {
                document.body.style.setProperty("--widget-font-size", res["styles"]["widgetFontSize"]);
              }
              if (res["styles"]["widgeFontFamily"]) {
                document.body.style.setProperty("--widget-font-family", res["styles"]["widgeFontFamily"]);
              }
          });
      })
  } 

  export { showExistingStyles };