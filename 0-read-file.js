
var fs = require('fs')

fs.readFile('./npm.json', function (err, data) {

  console.log('loaded file, length=', data.length)
  JSON.parse(data).rows.forEach(function (e) {
    console.log(e.value.name)
  })
})
