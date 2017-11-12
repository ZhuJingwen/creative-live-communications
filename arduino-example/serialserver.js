var SerialPort = require('serialport');
var Readline = SerialPort.parsers.Readline;
var port = new SerialPort('/dev/cu.usbmodem14311');
var parser = new Readline();
port.pipe(parser);
var socket = require('socket.io-client')('http://itp.jingwenzhu.com:8080');

// var mySerialPort = new SerialPort('/dev/cu.usbmodem14311', { //paste your port path here
//   baudRate: 9600,
//  parser: SerialPort.parsers.readline('\n')
// });

parser.on('data', function (inString) {
  //console.log('data: ' + inString.trim());
  var inData = inString.trim().split(',');
  var x = 400+10*parseInt(inData[0]);
  var y = 300+10*parseInt(inData[1]);
  var c = 10*parseInt(inData[2]);
  socket.emit('new shape', {
    s: "ellipse",
    x: x,
    y: y,
    c: c,
    w: 40,
    h: 40,
    r: 0
  });
  console.log(inData);
  //socket.emit('data',data);
});
