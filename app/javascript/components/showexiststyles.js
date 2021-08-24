function showExistStyles(url){
    fetch(url)
      .then(response => {
        response
          .json()
          .then(res => {
              if (res["widgetWidth"]) {
                document.body.style.setProperty("--widget-width", res["widgetWidth"]);
              }
              if (res["widgetHeight"]) {
                document.body.style.setProperty("--widget-height", res["widgetHeight"]);
              }
              if (res["widgetLayout"]) {
                window.setGlobalWidgetLayout(res["widgetLayout"]);
              }
              if (res["widgetTopbarColor"]) {
                document.body.style.setProperty("--widget-topbar-color", res["widgetTopbarColor"]);
              }
              if (res["widgetHighlightColor"]) {
                document.body.style.setProperty("--widget-highlight-color", res["widgetHighlightColor"]);
              }
              if (res["widgetBgColor"]) {
                document.body.style.setProperty("--widget-background-color", res["widgetBgColor"]);
              }
              if (res["widgetFontColor"]) {
                document.body.style.setProperty("--widget-text-color", res["widgetFontColor"]);
              }
              if (res["widgetFontSize"]) {
                document.body.style.setProperty("--widget-font-size", res["widgetFontSize"]);
              }
              if (res["widgeFontFamily"]) {
                document.body.style.setProperty("--widget-font-family", res["widgeFontFamily"]);
              }
          });
      })
  } 

  export { showExistStyles };