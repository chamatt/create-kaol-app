const http = require('http')
const openBrowser = require('open')

const link = 'http://localhost:4000'

function doRequest(url, callback) {
  let timer,
    req,
    sawResponse = false
  req = http
    .get(url, callback)
    .on('error', function (err) {
      clearTimeout(timer)
      req.abort()
      // prevent multiple execution of `callback` if error after
      // response
      if (!sawResponse) doRequest(url, callback)
    })
    .on('socket', function (sock) {
      timer = setTimeout(function () {
        req.abort()
        doRequest(url, callback)
      }, 10000)
    })
    .once('response', function (res) {
      sawResponse = true
      clearTimeout(timer)
    })
}

doRequest(link, (res) => {
  if (res) {
    openBrowser(link)
  }
})
