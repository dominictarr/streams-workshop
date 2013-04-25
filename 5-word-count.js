var fs         = require('fs')
var JSONStream = require('JSONStream')
var through    = require('through') 

var words = {}
//or use request...
fs.createReadStream('./npm.json')
  .pipe(JSONStream.parse(['rows', true, 'doc', 'readme']))
  .pipe(through(function (e) {
    if('string' === typeof e)
      e.split(/[^\w]+/).forEach(function (word) {
        words[word] = (words[word] || 0) + 1
      })
  }, function () {
    console.error(words)
  }))


