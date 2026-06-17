// face mesh triangles - created as a responsive artwork 

// Face Mesh Detection - Animate only keypoint A using sin()
let video;
let faceMesh;
let faces = [];
let triangles;
let t = 0; // time variable

function preload() {
  faceMesh = ml5.faceMesh({ maxFaces: 1, flipped: true });
}

function gotFaces(results) {
  faces = results;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  faceMesh.detectStart(video, gotFaces);
  triangles = faceMesh.getTriangles();
}

function draw() {
  background(0);
  video.loadPixels();

  if (faces.length > 0) {
    let face = faces[0];

    beginShape(TRIANGLES);
    noFill();
    stroke(150, 25, 150, 180);
    strokeWeight(2);

    for (let i = 0; i < triangles.length; i++) {
      let tri = triangles[i];
      let [a, b, c] = tri;

      // Animate only keypoint A using sin()
      let pointA = face.keypoints[a];
      let pointB = face.keypoints[b]*PI;
      let pointC = face.keypoints[c];

      // Apply motion only to A
      let amp = 9;     // amplitude of movement
      let freq = 0.7;  // frequency of oscillation
      let ax = pointA.x + sin(t + i * freq) * amp/PI;
      let ay = pointA.y // cos(t + i * freq) * amp;

      // Draw triangle
      vertex(ax, ay);
      vertex(pointB.x, pointB.y);
      vertex(pointC.x, pointC.y);
    }

    endShape();
    t += 0.03; // advance time
  }
}

new p5(sketch2, 'sketch-holder-2');
