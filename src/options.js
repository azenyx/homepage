import moment from 'moment/min/moment-with-locales'

// Saves options to chrome.storage
function save_options() {
  var language = document.getElementById('language').value
  var customfont = document.getElementById('customfont').value
  var customfontgoogle = document.getElementById('customfontgoogle').checked
  var no_seconds = document.getElementById('no_seconds').checked
  var themes = document.getElementById('homepage_themes').value
  var hexbg = document.getElementById('hexbg').checked
  var engines = document.getElementById('engines').value
  var wkey = document.getElementById('wkey').value
  var w3hours = document.getElementById('w3hours').checked
  var wlang = document.getElementById('wlanguage').value
  var tempc = document.getElementById('tempc').checked
  var links = document.getElementById('links').value
  var googleapps = document.getElementById('googleapps').checked
  var showSettings = document.getElementById('show-settings').checked
  var customcss = document.getElementById('customcss').value

  var custombg = []
  var custombg_previews = document.getElementsByClassName("preview-image")
  for (var i = 0; i < custombg_previews.length; i++) {
    custombg.push(custombg_previews[i].src)
  }

  chrome.storage.local.set({
    language: language,
    custombg: custombg,
    customfont: customfont,
    no_seconds: no_seconds,
    customfontgoogle: customfontgoogle,
    themes: themes,
    engines: engines,
    wkey: wkey,
    w3hours: w3hours,
    wlang: wlang,
    hexbg: hexbg,
    tempc: tempc,
    googleapps: googleapps,
    links: links,
    showSettings: showSettings,
    customcss: customcss
  }, function() {
    // Update status to let user know options were saved.
    var modal = document.getElementById('modal')
    var modaltarget = document.getElementsByClassName('modal')[0]
    modal.style.display = "flex"
    modaltarget.classList.remove('modal--close')
    setTimeout(function() {
      modaltarget.classList.add('modal--close')
      setTimeout(function() { modal.style.display = "none" }, 570)
    }, 1000)
  })
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.local.get({
    language: "",
    custombg: [],
    customfont: "",
    themes: "default",
    no_seconds: false,
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
    document.getElementById('language').value = items.language
    document.getElementById('customfont').value = items.customfont
    document.getElementById('homepage_themes').value = items.themes
    document.getElementById('no_seconds').checked = items.no_seconds
    document.getElementById('customfontgoogle').checked = items.customfontgoogle
    document.getElementById('hexbg').checked = items.hexbg
    document.getElementById('engines').value = items.engines
    document.getElementById('wkey').value = items.wkey
    document.getElementById('w3hours').checked = items.w3hours
    document.getElementById('wlanguage').value = items.wlang
    document.getElementById('tempc').checked = items.tempc
    document.getElementById('links').value = items.links
    document.getElementById('googleapps').checked = items.googleapps
    document.getElementById('show-settings').checked = items.showSettings
    document.getElementById('quicklink-limit').innerText = Math.floor((window.innerHeight - 65) / 40).toString()
    document.getElementById('customcss').value = items.customcss

    var all_previews = document.getElementById("custombg_previews")
    for (var i = 0; i < items.custombg.length; i++) {
      createPreview(items.custombg[i], all_previews)
    }
  })
}

document.addEventListener('DOMContentLoaded', function() {
  // Clock languages
  const languages = moment.locales()
  for (var i = 0; i < languages.length; i++) {
    var option = document.createElement("option")
    option.text = languages[i]
    option.value = languages[i]
    document.getElementById("language").appendChild(option)
  }

  // Weather languages
  const wlanguages = {
    "ar": "Arabic", "bg": "Bulgarian", "ca": "Catalan", "cz": "Czech",
    "de": "German", "el": "Greek", "fa": "Persian (Farsi)", "fi": "Finnish",
    "fr": "French", "gl": "Galician", "hr": "Croatian", "hu": "Hungarian",
    "it": "Italian", "ja": "Japanese", "kr": "Korean", "la": "Latvian",
    "lt": "Lithuanian", "mk": "Macedonian", "nl": "Dutch", "pl": "Polish",
    "pt": "Portuguese", "ro": "Romanian", "ru": "Russian", "se": "Swedish",
    "sk": "Slovak", "sl": "Slovenian", "es": "Spanish", "tr": "Turkish",
    "ua": "Ukrainian", "vi": "Vietnamese", "zh_cn": "Chinese Simplified",
    "zh_tw": "Chinese Traditional"
  }

  for (var g in wlanguages) {
    var option2 = document.createElement("option")
    option2.text = wlanguages[g]
    option2.value = g
    document.getElementById("wlanguage").appendChild(option2)
  }

  // Homepage themes
  const homepage_themes = [
    "default", "terminal"
  ]
  for (var t in homepage_themes) {
    var option_theme = document.createElement("option")
    option_theme.text = homepage_themes[t]
    option_theme.value = homepage_themes[t]
    document.getElementById("homepage_themes").appendChild(option_theme)
  }
})

// CustomBG Appender
document.getElementById('custombg_uploader').onchange = function() {
  var all_previews = document.getElementById("custombg_previews")
  var file = document.querySelector('input[type=file]').files[0]
  var reader = new FileReader()

  reader.addEventListener("load", function () {
    createPreview(reader.result, all_previews)
  }, false)

  if (file) { reader.readAsDataURL(file) }
}

// CustomBG Remover
document.body.onclick = function (ev) {
  if (ev.target.getAttribute("class") == "preview-image") {
    ev.target.remove()
  }
}

function custombg_prune() {
  var custombg_previews = document.getElementById("custombg_previews")
  while (custombg_previews.firstChild) {
    custombg_previews.removeChild(custombg_previews.firstChild);
  }
}

function createPreview(image, target) {
  var container = document.createElement("div")
  container.classList.add("preview-container")

  var preview = document.createElement("img")
  preview.classList.add("preview-image")
  preview.src = image

  container.append(preview) // div -> img
  target.append(container) // div
}

document.addEventListener('DOMContentLoaded', restore_options)
document.getElementById('custombg_prune').addEventListener('click', custombg_prune)
document.getElementById('save').addEventListener('click', save_options)
