const sideBar = () => {
  const sidebar = document.querySelector('.sidebar');
  const styleBar = document.querySelector(".stylebar-wrapper");

  const hamburgerMenu = document.getElementById("sidebar-hamburger-menu");
  const navBtns = document.querySelectorAll(".nav-btn");
  const stylesBtn = document.getElementById('btn-styles');
  const styles = document.querySelectorAll(".style");

  const styleOptionContents = document.querySelectorAll(".style-options-content")

  const layoutStyle = document.querySelector("#layout-style");
  const layoutContent = document.querySelector(".style-options-content.layout")

  const sizeStyle = document.querySelector("#size-style");
  const sizeContent = document.querySelector(".style-options-content.size")

  const fontStyle = document.querySelector("#font-style");
  const fontContent = document.querySelector(".style-options-content.font")

  const colors = document.querySelector("#colors-style");

  const backgroundStyle = document.querySelector("#background-style");
  const backgroundContent = document.querySelector(".style-options-content.background")

  const styleOptionsWrapper = document.querySelector(".style-options-wrapper");
  const styleSectionName = document.querySelector(".style-section-name");

  // const styleOptionsContent = document.querySelector(".style-options-content");

  // const fontSizeSlider = document.getElementById("font-size-slider");
  // const fontSizeValue = document.getElementById("font-size-value");

  // fontSizeSlider.addEventListener("input", e => {
  //   // demoText.style.fontSize = `${e.target.value}px`;
  //   fontSizeValue.innerText = `${e.target.value}px`;
  // });

  const clearStyleOptionContent = () => {
    styleOptionContents.forEach((styleOptionContent) => {
      styleOptionContent.classList.remove("active");
    })
  }

  navBtns.forEach((navBtn) => {
    navBtn.addEventListener("click", (e) => {
      styleOptionsWrapper.classList.remove("active");
      sidebar.classList.add("active");
      navBtns.forEach((navBtn) => { navBtn.classList.remove("focus") })
      e.currentTarget.classList.toggle("focus");
    })
  })

  hamburgerMenu.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    styleOptionsWrapper.classList.remove("active");
    if (styleBar.classList.contains("active")) {
      styleBar.classList.remove("active");
    }
    navBtns.forEach((navBtn) => { navBtn.classList.remove("focus") })
  })

  stylesBtn.addEventListener("click", () => {
    sidebar.classList.add("active");
    styleBar.classList.toggle("active");
  })

  styles.forEach((style) => {
    style.addEventListener("click", (e) => {
      styles.forEach((style) => {
        style.classList.remove("focus");
      })
      e.currentTarget.classList.add("focus");
      styleOptionsWrapper.classList.add("active");
    })
  })

  layoutStyle.addEventListener("click", () => {
    clearStyleOptionContent();
    styleOptionsWrapper.classList.add("active");
    styleSectionName.innerText = "Layout";
    layoutContent.classList.add("active");
  })

  sizeStyle.addEventListener("click", () => {
    clearStyleOptionContent();
    styleOptionsWrapper.classList.add("active");
    styleSectionName.innerText = "Size";
    sizeContent.classList.add("active");
  })

  fontStyle.addEventListener("click", () => {
    clearStyleOptionContent();
    styleOptionsWrapper.classList.add("active");
    styleSectionName.innerText = "Font";
    fontContent.classList.add("active");
  })

  colors.addEventListener("click", () => {
    clearStyleOptionContent();
    styleOptionsWrapper.classList.add("active");
    styleSectionName.innerText = "Colors"
  })

  backgroundStyle.addEventListener("click", () => {
    clearStyleOptionContent();
    styleOptionsWrapper.classList.add("active");
    styleSectionName.innerText = "Background";
    backgroundContent.classList.add("active");
  })
}

export { sideBar };
