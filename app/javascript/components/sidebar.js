const sideBar = () => {
  const sidebar = document.querySelector('.sidebar');
  const styleBar = document.querySelector(".stylebar-wrapper");

  const hamburgerMenu = document.getElementById("sidebar-hamburger-menu");
  const navBtns = document.querySelectorAll(".nav-btn");
  const productsBtn = document.getElementById("nav-btn-products");
  const stylesBtn = document.getElementById('nav-btn-styles');
  const styles = document.querySelectorAll(".style");

  const styleOptionContents = document.querySelectorAll(".style-options-content");

  const productViewWrapper = document.querySelector(".products-view-wrapper");

  const styleOptionsWrapper = document.querySelector(".style-options-wrapper");
  const styleSectionName = document.querySelector(".style-section-name");

  const fontSizeSlider = document.getElementById("font-size-slider");
  const fontSizeValue = document.getElementById("font-size-value");

  const initialState = () => {
    if (window.location.pathname === "/widgets") {
      navBtns[0].classList.add("focus")
    } else {
      navBtns[2].classList.add("focus")
    }
  }

  initialState();


  fontSizeSlider.addEventListener("input", e => {
    fontSizeValue.innerText = `${e.target.value}px`;
  });

  const capitalize = (string) => {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }

  const clearStyleOptionContent = () => {
    styleOptionContents.forEach((styleOptionContent) => {
      styleOptionContent.classList.remove("active");
    })
  }

  const clearStyle = () => {
    styles.forEach((style) => {
      style.classList.remove("focus");
    })
  }

  navBtns.forEach((navBtn) => {
    navBtn.addEventListener("click", (e) => {
      navBtns.forEach((navBtn) => { navBtn.classList.remove("focus") })
      styleOptionsWrapper.classList.remove("active");
      sidebar.classList.add("active");
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
    productViewWrapper && productViewWrapper.classList.remove("active");

    const condition = checkStyleCondition();
    if (condition) {
      widgetStyling();
    }


    sidebar.classList.add("active");
    styleBar.classList.toggle("active");
  })

  productsBtn.addEventListener("click", () => {
    styleBar.classList.remove("active");
    productViewWrapper && productViewWrapper.classList.toggle("active");
  })

  styles.forEach((style) => {
    style.addEventListener("click", () => {
      if (!style.classList.contains("focus")) {
        clearStyle();
        style.classList.add("focus")
      } else {
        style.classList.remove("focus")
      }
    })
  })


  const styleKeys = ["size", "layout", "background", "font", "colors"];

  const styleElement = (key) => {
    return document.getElementById(`${key}-style`)
  }

  const contentElement = (key) => {
    return document.querySelector(`.style-options-content.${key}`)
  }

  styleKeys.forEach((key) => {
    styleElement(key).addEventListener("click", () => {
      addToggle(key);
    })
  })

  const addToggle = (key) => {
    if (!contentElement(key).classList.contains("active")) {
      clearStyleOptionContent();
      styleOptionsWrapper.classList.add("active");
      styleSectionName.innerText = capitalize(key);
      contentElement(key).classList.add("active");
    } else {
      styleOptionsWrapper.classList.remove("active");
      contentElement(key).classList.remove("active");
    }
  }
}

export { sideBar };
