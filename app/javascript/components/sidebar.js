const sideBar = () => {
  const btn = document.getElementById("btn");
  const sidebar = document.querySelector('.sidebar');
  const stylesBtn = document.getElementById('btn-styles');
  const styleBar = document.querySelector(".stylebar-wrapper");
  const layout = document.querySelector(".layout");
  const styleOptionsWrapper = document.querySelector(".style-options-wrapper");
  const styleSectionName = document.querySelector(".style-section-name");

  btn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    if (styleBar.classList.contains("active")) {
      styleBar.classList.remove("active");
    }
  })

  stylesBtn.addEventListener("click", () => {
    sidebar.classList.add("active");
    styleBar.classList.toggle("active");
  })

  layout.addEventListener("click", () => {
    styleOptionsWrapper.classList.add("active");
    styleSectionName.innerText = "Layout"
  })
}

export { sideBar };
