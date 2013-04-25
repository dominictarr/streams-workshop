var net = require('net')

net.createServer(function (stream) {
  stream.pipe(net.connect(8000)).pipe(stream)
}).listen(3000)









    
    .on('error', function (err) {
      console.error(err.code)
      stream.destroy()
    })
  
