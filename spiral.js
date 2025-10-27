let spirals = [];

  function setup() {
    createCanvas(windowWidth, windowHeight);
    // OR: match body/client dimensions for safety
  background(0);
}

function draw() {
  background(0, 20); // subtle fade for trail effect

  for (let i = spirals.length - 1; i >= 0; i--) {
    spirals[i].update();
    spirals[i].display();
    if (spirals[i].isDead()) {
      spirals.splice(i, 1);
    }
  }
}

function mousePressed() {
  spirals.push(new Spiral(mouseX, mouseY));
}

function mouseMoved() {
  if (random(1) < 0.05) { // controlled spawning
    spirals.push(new Spiral(mouseX, mouseY));
  }
}

class Spiral {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.points = [];
    this.angle = random(TWO_PI);
    this.radius = 0;
    this.life = 255;
    this.color = color(random(300, 255), random(80, 255), random(90, 255), this.life);
  }

  update() {
    this.radius += 0.5;
    this.angle += 0.1;
    let x = this.origin.x + cos(this.angle) * this.radius;
    let y = this.origin.y + sin(this.angle) * this.radius;
    this.points.push(createVector(x, y));

    if (this.points.length > 100) {
      this.points.shift(); // trim trail length
    }

    this.life = 6;
    this.color.setAlpha(this.life);
  }

  display() {
    noFill();
    stroke(this.color);
    strokeWeight(5);
    beginShape();
    for (let pt of this.points) {
      vertex(pt.x, pt.y);
    }
    endShape();
  }

  isDead() {
    return this.life <= 2;
  }
}
