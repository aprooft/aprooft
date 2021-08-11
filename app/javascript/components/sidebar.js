const sideBar = () => {
  const btn = document.getElementById("btn");
  const sidebar = document.querySelector('.sidebar');
  const stylesBtn = document.getElementById('btn-styles');
  const styleBar = document.querySelector(".stylebar-wrapper");
  const layout = document.querySelector(".layout-style");
  const size = document.querySelector(".size-style");
  const font = document.querySelector(".font-style");
  const colors = document.querySelector(".colors-style");
  const background = document.querySelector(".background-style");
  const styleOptionsWrapper = document.querySelector(".style-options-wrapper");
  const styleSectionName = document.querySelector(".style-section-name");
  const navBtns = document.querySelectorAll(".nav-btn");

  const styleOptionsContent = document.querySelector(".style-options-content");

  const fontSizeSlider = document.getElementById("font-size-slider");
  const fontSizeValue = document.getElementById("font-size-value");

  // fontSizeSlider.addEventListener("input", e => {
  //   // demoText.style.fontSize = `${e.target.value}px`;
  //   fontSizeValue.innerText = `${e.target.value}px`;
  // });

  navBtns.forEach((navBtn) => {
    navBtn.addEventListener("click", () => {
      navBtn.classList.toggle("focus");
    })
  })

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

  size.addEventListener("click", () => {
    styleOptionsWrapper.classList.add("active");
    styleSectionName.innerText = "Size"
  })

  font.addEventListener("click", () => {
    styleOptionsWrapper.classList.add("active");
    styleSectionName.innerText = "Font"
  })

  colors.addEventListener("click", () => {
    styleOptionsWrapper.classList.add("active");
    styleSectionName.innerText = "Colors"
  })

  background.addEventListener("click", () => {
    styleOptionsWrapper.classList.add("active");
    styleSectionName.innerText = "Background"
  })
}

export { sideBar };
