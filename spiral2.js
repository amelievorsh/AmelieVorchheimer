let spirals = [];
let autoSpawnInterval;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(5, 1, 12); // Deep dark canvas base

  // Check if screen is small (phone) to trigger auto-spawning
  if (windowWidth < 768) {
    startAutoSpawning();
  }
}

function draw() {
  // Low alpha creates an ongoing neon trail effect
  background(5, 1, 12, 20); 

  // Update and render all active generative systems inside the global array
  for (let i = spirals.length - 1; i >= 0; i--) {
    spirals[i].update();
    spirals[i].display();
    if (spirals[i].isDead()) {
      spirals.splice(i, 1);
    }
  }
}

/* --- Interaction Handlers --- */

function mousePressed() {
  spirals.push(new Spiral(mouseX, mouseY));
}

function mouseMoved() {
  if (random(1) < 0.05) {
    spirals.push(new Spiral(mouseX, mouseY));
  }
}

function startAutoSpawning() {
  if (!autoSpawnInterval) {
    autoSpawnInterval = setInterval(() => {
      let x = random(width);
      let y = random(height);
      spirals.push(new Spiral(x, y));
    }, 500);
  }
}

/* --- The Repaired Class --- */

class Spiral {
  constructor(x, y) {
    this.offset = createVector(x, y); // Anchor origin point
    this.angle = random(TWO_PI, 5);
    this.scalar = random(15, 70);
    
    let baseSpeed = random(0.05, 0.09); 
    
    // 50% chance to make speed negative (counter-clockwise)
    this.speed = random(1) < 0.8 ? baseSpeed : -baseSpeed;
  
    this.life = 255;
    this.decay = random(2.5, 5);
    this.circleSize = random(80, 100);

    // 🎨 Bright reds + dark purples assigned at birth
    if (random(1) < 0.5) {
      this.baseColor = { r: random(20, 25), g: random(20, 60), b: random(180, 250) };
    } else {
      this.baseColor = { r: random(100, 160), g: 0, b: random(120, 200) };
    }
  }

  update() {
    // Increment geometric expansion values
    this.angle += this.speed;
    this.scalar += this.speed * 2; // Expands outward over time
    this.life -= this.decay;       // Fades out
  }

  display() {
    noFill();
    strokeWeight(0.5); // Fine cyber-grid aesthetic
    stroke(this.baseColor.r, this.baseColor.g, this.baseColor.b, this.life);

    // Compute orbital geometry coordinates relative to its custom origin point
    let x = this.offset.x + cos(this.angle) * this.scalar;
    let y = this.offset.y + sin(this.angle) * this.scalar;
    
    circle(x, y, this.circleSize);
  }

  isDead() {
    return this.life <= 0;
  }
}
