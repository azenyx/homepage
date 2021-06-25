import { updateDateAndTime } from "./utils/timeManager.js"

import moment from 'moment/min/moment-with-locales'

export var backgroundElement = document.getElementById('js-bg')

export function runClock() {
  // Start updating
  moment.locale(navigator.language)
  updateDateAndTime()

  // Set background to a random one
  var selected = Math.floor(Math.random() * 31)

  backgroundElement.onload = function () {
    backgroundElement.style.opacity = 1
  }

  const fs = require('fs');
  const dir = './directory';

  fs.readdir(dir, (err, files) => {
    console.log();
  });

  // Finally put the last touch on demo page
  document.addEventListener('DOMContentLoaded', function() {
    backgroundElement.src = 'assets/images/backgrounds/background' + selected + '.jpg'
  }, false)
}
