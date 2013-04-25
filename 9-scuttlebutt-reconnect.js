
var net = require('net')
var opts = require('optimist').argv
var split = require('split')

var Model = require('scuttlebutt/model')
var chat  = new Model()

var name = opts.name

if(opts.server)
  net.createServer(function (stream) {
    var addr = stream.remoteAddress
    stream.pipe(chat.createStream()).pipe(stream)

    /*
    function onEnd () {
      console.log('disconnected:', addr)
    }
    stream.on('end', onEnd).on('error', onEnd)
    */
  }).listen(opts.port || 8989)
else {
  //HMM, is there some way to reconnect without chat breaking?

  function connect () {

  var stream = net.connect(opts.port || 8989, opts.host)

  stream.pipe(chat.createStream()).pipe(stream)
    .on('error', function () {
      console.log('server down')
    })
    .on('close', setTimeout.bind(null, connect, 1000))

  }
  
  connect() 
}

if(!name)
  throw new Error('must provide name')

chat.on('change', function (key, value) {
  console.log(key+':', value)
})

process.stdin
  .pipe(split()) //split into lines
  .on('data', function (message) {
    chat.set(Date.now() + ' ' + name, message)
  })

