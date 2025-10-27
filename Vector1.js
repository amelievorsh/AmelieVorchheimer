let turtleX;
let turtleY;
let turtleHeading = 0;
let osc;

function setup() {
  createCanvas(windowWidth, windowHeight);
  turtleX = width / 2;
  turtleY = height / 2;
  background(6);

  osc = new p5.Oscillator('sine');
  osc.amp(1);
  osc.start();

  frameRate(65);
}

function draw() {
  let noteFreq = random(1000 / 6 * 3);
  osc.freq(noteFreq);
  stroke(random(250), random(256), random(20));

  rotateTurtle(random(500));
  let length = random(20);

  forward(length);
  rotateTurtle(20 / noteFreq);

  forward(length);
  rotateTurtle(60 * noteFreq / 10);

  forward(length);
  rotateTurtle(80 * noteFreq);

  forward(length);
}

function forward(amount) {
  let newX = turtleX + cos(radians(turtleHeading)) * amount;
  let newY = turtleY + sin(radians(turtleHeading)) * amount;

  line(turtleX, turtleY, newX, newY);
  fill(10);

  turtleX = newX;
  turtleY = newY;

  // Boundary check and wrapping logic
  if (turtleX < 0) {
    turtleX = width;
  }
  if (turtleX > width) {
    turtleX = 0;
  }
  if (turtleY < 0) {
    turtleY = height;
  }
  if (turtleY > height) {
    turtleY = 0;
  }
}

function rotateTurtle(degrees) {
  turtleHeading += degrees;
}