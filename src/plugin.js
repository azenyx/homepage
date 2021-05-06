import { getWeather } from "./utils/weather.js"
import { makeLinks } from "./utils/links.js"
import { searchengine } from "./utils/lists.js"
import { timeInHex } from "./utils/timeManager.js"
import { runClock, backgroundElement } from "./_main.js"
import { append_css_theme, theme_terminal } from "./utils/themes.js"

import moment from 'moment/min/moment-with-locales'

runClock()

chrome.storage.local.get({
  language: "",
  custombg: "",
  customfont: "",
  themes: "default",
  customfontgoogle: false,
  engines: "google",
  wkey: "",
  w3hours: false,
  wlang: "en",
  tempc: true,
  hexbg: false,
  links: "",
  googleapps: false,
  showSettings: true,
  customcss: ""
}, function(items) {
  if (items.custombg.length) {
    var chooseranbgindex = Math.floor(Math.random() * items.custombg.length)
    backgroundElement.src = items.custombg[chooseranbgindex]
  }

  if (items.language) { moment.locale(items.language) }

  if (items.wkey) {
    navigator.geolocation.getCurrentPosition(function(position) {
      getWeather(items, position)
    })
  }

  if (items.customfont) {
    var addFont = '"' + items.customfont + '", "Lato", sans-serif, Arial'
    if (items.customfontgoogle) {
      var gFont = document.createElement("link")
      gFont.href = "https://fonts.googleapis.com/css?family=" + items.customfont.replace(" ", "+")
      gFont.rel = "stylesheet"
      document.head.appendChild(gFont)
    }
    document.body.style.fontFamily = addFont
  }

  if (items.hexbg) {
    backgroundElement.src = ""
    timeInHex()
  }

  // Theme chooser
  switch (items.themes) {
    case "terminal":
      theme_terminal(items, backgroundElement)
      append_css_theme("terminal")
      break
    default:
      // Fucking nerd wants default theme, boring
  }

  if (items.engines !== "google") {
    if (items.engines == "none") {
      document.getElementById('formsearch').style.display = "none"
    }
    document.getElementById('formsearch').action = searchengine[items.engines].url
    document.getElementById('forminput').placeholder = searchengine[items.engines].holder
  }

  if (items.customcss) {
    var cssEl = document.createElement("style")
    cssEl.type = "text/css"
    cssEl.innerText = items.customcss
    document.head.appendChild(cssEl)
  }

  if (items.links) {
    if (items.terminal) {
      makeLinks(items, true)
    } else {
      makeLinks(items, false)
    }
  }

  if (items.showSettings) {
    var settings = document.getElementById('settings')
    settings.removeAttribute('style')
    settings.addEventListener('click', function () {
      chrome.runtime.openOptionsPage()
    })
  }

  if (items.googleapps) {
    document.getElementById('googleapps').style.display = "block"
    document.getElementById('googleapps-btn').style.display = "flex"
  }
})
