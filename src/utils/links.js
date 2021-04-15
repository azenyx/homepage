// Bowser65 made this, yes
export function makeLinks(items, no_loading=false) {
  var screenH = document.getElementById('js-bg').getBoundingClientRect().height - 65
  var links = items.links.split('\n').slice(0, Math.floor((window.innerHeight - 65) / 40))
  if (links.length * 52 > screenH) {
    document.getElementById('quicklinks').classList.add('compact')
  }

  if (!no_loading) {
    for (var i = 0; i < links.length; i++) {
      (function (lnk) {
        if (lnk.length) {
          setTimeout(async function () {
            var link = document.createElement('a')
            var img = document.createElement('img')
            var txt = document.createElement('span')

            link.classList.add('quicklink')
            link.classList.add('load')
            setTimeout(function () {
              link.classList.remove('load')
            }, 810)
            link.setAttribute('href', lnk)

            img.classList.add('quicklink-icon')
            img.setAttribute(
              "src",
              `https://besticon-demo.herokuapp.com/icon?url=${encodeURIComponent(
                lnk.replace(/^(?:https?:\/\/)?/i, "")
              )}&size=30`
            );

            txt.classList.add('quicklink-txt')
            txt.innerText = lnk

            link.appendChild(img)
            link.appendChild(txt)
            document.getElementById('quicklinks').appendChild(link)
            }, i * 200)
          }
        })(links[i])
      }
    } else {
      for (var g = 0; g < links.length; g++) {
        (function (lnk) {
          if (lnk.length) {
            var link = document.createElement('a')
            var img = document.createElement('img')
            var txt = document.createElement('span')

            link.classList.add('quicklink')
            link.setAttribute('href', lnk)

            img.classList.add('quicklink-icon')

            txt.classList.add('quicklink-txt')
            txt.innerText = lnk

            link.appendChild(img)
            link.appendChild(txt)
            document.getElementById('quicklinks').appendChild(link)
          }
        })(links[g])
      }
    }
  }
