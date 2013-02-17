
var JSONStream = require('JSONStream')

//var npmJson = require('./npm.json')

var fs = require('fs')
var split = require('split')
var through = require('through')
 
var Stream = require('stream')
var inherits = require('util').inherits

inherits(NoopStream, Stream)

function NoopStream () {
  this.writable = this.readable = true
}

var proto = NoopStream.prototype

proto.write = function (data) {
  var self = this
  if(data)
    data.split(/[^\w]+/).forEach(function (d) {
      self.emit('data', d.toUpperCase() + '\n')
    })
  return true
}

proto.end = function () {
  this.emit('end')
}

var n = 0, js
fs.createReadStream('../npm.json')
  //or use request
  .pipe(JSONStream.parse(['rows', true, 'doc', 'readme']))
  .pipe(new NoopStream())
  .pipe(process.stdout)


