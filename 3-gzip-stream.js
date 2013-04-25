
var fs = require('fs')
var zlib = require('zlib')

fs.createReadStream('./mini-npm.json')
.pipe(zlib.createGzip())
.pipe(fs.createWriteStream('./mini-npm.json.gz'))
