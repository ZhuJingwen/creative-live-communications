var socket = io.connect('http://itp.jingwenzhu.com:8080/');

socket.on('connect', function() {
  console.log("Connected");
});

socket.on('new shape', function(data) {
  drawShape(data.s, data.x, data.y, data.c, data.w, data.h, data.r);
});

var initS = 70;
var initB = 90;

/************* CREATE YOUR OWN DESIGN HERE **************/
var myHue = 90; //you could pick your color hue value from 0 to 360;
//var myHue = random(100); //if you want a random color
var myWidth = 50; //width of the shape
var myHeight = 50; //height of the shape
var myRotation = 20; //you could pick your rotation angle;

/*******************************************************/

function setup() {
  var canvasContainer = document.getElementById("canvasContainer");
  var myCanvas = createCanvas(800, 600);
  myCanvas.parent(canvasContainer);
  colorMode(HSB);
  background(240, 45, 30);

}

function draw(){

}

function mouseDragged() {

  /************* DRAW THE SHAPE WHEN MOUSE DRAGGED **************/
  drawShape("rect",mouseX, mouseY, myHue, myWidth,myHeight, myRotation);
  sendSelf("rect",mouseX, mouseY, myHue, myWidth,myHeight, myRotation);
  //myRotation+= 0.01;
}

function mousePressed(){
  /************* DRAW THE SHAPE WHEN MOUSE PRESSED **************/
  drawShape("rect",mouseX, mouseY, myHue, myWidth,myHeight, myRotation);
  sendSelf("rect",mouseX, mouseY, myHue, myWidth,myHeight, myRotation);
}



/************* BELOW ARE ALL PRE-WRITTEN FUNCTIONS **************/
function drawShape(s, x, y, c, w, h, r) {
  if(s == "rect"){
    fill(c, initS, initB);
    noStroke();
    push();  // Start a new drawing state
    translate(x, y);
    rotate(r);
    rect(-w/2, -h/2, w, h);
    pop();  // Restore original states
  }else if(s == "ellipse"){
    fill(c, initS, initB);
    noStroke();
    ellipse(x, y, w, h);
  }else if(s == "triangle"){
    fill(c, initS, initB);
    noStroke();
    push();  // Start a new drawing state
    translate(x, y);
    rotate(r);
    triangle(-w/2, -h/2, w/2, -h/2, 0,h/2);
    pop();  // Restore original states
  }
}

function sendSelf(s, x, y, c, w, h, r) {
  socket.emit('new shape', {
    s: s,
    x: x,
    y: y,
    c: c,
    w: w,
    h: h,
    r: r
  });
};
