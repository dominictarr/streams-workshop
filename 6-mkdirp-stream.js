
var through = require('through')
var mkdirp  = require('mkdirp')
var path    = require('path')
var fs      = require('fs')

module.exports = function (file) {
  var ts = through()
  //.pause()

  mkdirp(path.dirname(file), function (err) {
    if(err && err.code != 'EEXIST')
      ts.emit('error', err)

    ts.pipe(fs.createWriteStream(file))
    //ts.resume()
  })

  return ts
}

if(!module.parent)
  process.stdin.pipe(module.exports(process.argv[2]))
