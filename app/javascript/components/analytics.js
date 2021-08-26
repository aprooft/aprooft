const changeWidget = () => {
  const selectField = document.querySelector("#select-widget select")
  const submitBtn = document.querySelector("#select-widget input");
  console.log(submitBtn)
  console.log(selectField)

  selectField.addEventListener("change", () => {
    submitBtn.click();
  })
}

export { changeWidget };