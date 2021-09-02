// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import iro from '@jaames/iro';
import "chartkick/chart.js"
import 'aos/dist/aos.css';
import '@fortawesome/fontawesome-free/css/all.css'

Rails.start()
Turbolinks.start()
ActiveStorage.start()



// ----------------------------------------------------
// Note(lewagon): ABOVE IS RAILS DEFAULT CONFIGURATION
// WRITE YOUR OWN JS STARTING FROM HERE 👇
// ----------------------------------------------------

// External imports
import "bootstrap";
import AOS from 'aos'
AOS.init({
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
});

AOS.refresh();



// Internal imports, e.g:
// import { initSelect2 } from '../components/init_select2';
import { sideBar } from "../components/sidebar"
import { checkStyleCondition } from "../components/check_style_condition"
import { widgetStyling } from "../components/widget_styling"
import { changeWidget } from "../components/analytics"

document.addEventListener('turbolinks:load', () => {
  // Call your functions here, e.g:
  // initSelect2();
  // Create a new color picker instance
  // https://iro.js.org/guide.html#getting-started

  var colorPicker = new iro.ColorPicker(".colorPicker", {
    // color picker options
    // Option guide: https://iro.js.org/guide.html#color-picker-options
    width: 200,
    color: "rgb(255, 0, 0)",
    borderWidth: 1,
    borderColor: "#fff",
  });

  var hexInput = document.getElementById("hexInput");

  // https://iro.js.org/guide.html#color-picker-events
  colorPicker.on(["color:init", "color:change"], function (color) {
    // Show the current color in different formats
    // Using the selected color: https://iro.js.org/guide.html#selected-color-api
    hexInput.value = color.hexString;
  });

  hexInput.addEventListener('change', function () {
    colorPicker.color.hexString = this.value;
  });

  sideBar();
  const condition = checkStyleCondition();
  if (condition) {
    widgetStyling();
  }
  changeWidget();
});


window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

