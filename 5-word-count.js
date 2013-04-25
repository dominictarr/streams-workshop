
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
    data.split().forEach(function (d) {
      self.emit('data', d.toUpperCase() + '\n')
    })
  return true
}

proto.end = function () {
  this.emit('end')
}

var n = 0, js
var words = {}
//or use request
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


