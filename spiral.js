let spirals = [];
let autoSpawnInterval; // for mobile auto-generation

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  colorMode(RGB, 255, 255, 255, 255);

  // Check if screen is small (phone)
  if (windowWidth < 768) {
    startAutoSpawning();
  }
}

function draw() {
  background(0, 20); // subtle trail fade

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
  if (random(1) < 0.05) {
    spirals.push(new Spiral(mouseX, mouseY));
  }
}

// Automatically spawn spirals every 0.5s on mobile
function startAutoSpawning() {
  if (!autoSpawnInterval) {
    autoSpawnInterval = setInterval(() => {
      let x = random(width);
      let y = random(height);
      spirals.push(new Spiral(x, y));
    }, 500);
  }
}

// Stop spawning if needed (e.g. on resize)
function stopAutoSpawning() {
  if (autoSpawnInterval) {
    clearInterval(autoSpawnInterval);
    autoSpawnInterval = null;
  }
}

// Adjust auto-generation when resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (windowWidth < 768) {
    startAutoSpawning();
  } else {
    stopAutoSpawning();
  }
}

class Spiral {
    constructor(x, y) {
      this.origin = createVector(x, y);
      this.points = [];
      this.angle = random(TWO_PI);
      this.radius = 0;
      this.life = 255;
  
      // 🎨 Bright reds + dark purples
      if (random(1) < 0.5) {
        // Bright red
        this.color = color(random(220, 255), random(20, 60), random(20, 60), this.life);
      } else {
        // Deep purple
        this.color = color(random(100, 160), 0, random(120, 200), this.life);
      }
    }
  
    update() {
      this.radius += 0.5;
      this.angle += 0.1;
      let x = this.origin.x + cos(this.angle) * this.radius;
      let y = this.origin.y + sin(this.angle) * this.radius;
      this.points.push(createVector(x, y));
  
      if (this.points.length > 100) {
        this.points.shift();
      }
  
      this.life -= 2;
      this.color.setAlpha(this.life);
    }
  
    display() {
      noFill();
      stroke(this.color);
      strokeWeight(4);
      beginShape();
      for (let pt of this.points) {
        vertex(pt.x, pt.y);
      }
      endShape();
    }
  
    isDead() {
      return this.life <= 0;
    }
  }
