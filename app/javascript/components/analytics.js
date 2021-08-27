const changeWidget = () => {
  const selectField = document.querySelector("#select-widget select")
  const submitBtn = document.querySelector("#select-widget input");

  if (selectField != null) {
    selectField.addEventListener("change", () => {
      submitBtn.click();
    })
  }

}

export { changeWidget };