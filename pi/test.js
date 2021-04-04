const http = require('http')

const data = JSON.stringify({
  temp: 69,
  time: 420
})

const options = {
  hostname: 'ec2-13-52-241-242.us-west-1.compute.amazonaws.com',
  port: 3001,
  path: '/temp',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

const req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.write(data)
req.end()



