
var through = require('through')
var request = require('request')
var split   = require('split')

request('http://api.bitcoincharts.com/v1/trades.csv?symbol=mtgoxUSD')
  .pipe(split(/\r?\n/, function (line) {
    //doesn't handle a, "b, c", d
    return line.split(/,/).map(Number)
  }))
  .pipe(through(function (d) {
    console.log(d)
  }))
