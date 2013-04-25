

var fs = require('fs')
var zlib = require('zlib')

console.error('reading file')
fs.readFile('./mini-npm.json', function (err, buf) {
  if(err) throw err
  console.error('compressing')
  zlib.gzip(buf, function (err, buf) {
    if(err) throw err
    console.error('writing file')
    fs.writeFile('./mini-npm.json.gz', buf, function (err) {
      if(err) throw err
      console.error('done')
    })
  })
})
