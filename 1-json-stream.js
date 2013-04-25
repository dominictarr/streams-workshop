var JSONStream = require('JSONStream')

var fs      = require('fs')
var split   = require('split')
var through = require('through')
var request = require('request')

var n = 0, js
fs.createReadStream('./npm.json')
  //or use request
  //request.get('http://10.10.2.255:8000/mini-npm.json')
  .pipe(JSONStream.parse(['rows', true, 'doc', 'name']))
  .pipe(through(function (d) {
//    if(Math.random() < 0.1)
    console.log(d)
  }))

//stringify it again like this:
//.pipe(JSONStream.stringify('{"rows":[', ',\n', '] }'))

