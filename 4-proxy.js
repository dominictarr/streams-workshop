var net = require('net')

net.createServer(function (stream) {
  stream.pipe(net.connect(8000)
    .on('error', function (err) {
      console.error(err.code)
      stream.destroy()
    })).pipe(stream)
  
}).listen(3000)

