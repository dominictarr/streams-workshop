
var fs = require('fs')
var zlib = require('zlib')

fs.createReadStream('./npm.json')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('./npm.json.gz'))

