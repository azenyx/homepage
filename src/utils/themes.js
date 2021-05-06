import { isChrome, isFirefox, getBrowser } from "./browser.js"

export function append_css_theme(name) {
  const el = document.createElement("link")
  el.href = `assets/css/themes/${name}.css`
  el.type = "text/css"
  el.rel = "stylesheet"
  document.head.append(el)
}

export function theme_terminal(items, backgroundElement) {
  if (items.hexbg || !items.custombg.length) { backgroundElement.src = "" }
  if (items.customfont) { document.body.style.fontFamily = null; }

  var me = document.getElementById("terminal-me")
  me.style.display = "block"
  me.innerText = `${getBrowser()}@homepage:~$ now --watch`
}
