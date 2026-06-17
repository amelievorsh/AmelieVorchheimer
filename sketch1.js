//Frequency Selector - part of ongoing webdevelopment project 

let midpoint = 200;

let osc, fft;

let slider;
let textBox;

function setup() {
  createCanvas(600, 250);
  
  slider = createSlider(100, 600, 100, 1);
  slider.position(220, 50);
  
  textBox = createInput(slider.value().toString());
  textBox.hide();
  //textBox.position(30, 300);
  //textBox.size(50);

  osc = new p5.SinOsc; // set frequency and type
  osc.amp(0.9);

  fft = new p5.FFT();
  osc.start();
}

function draw() {
  background(25);
  
  let fre = slider.value();
  
  textBox.value(fre);

  fill(150,30,200);
  noStroke();
  textSize(30);
  
  text("Frequency: " + fre, width/3, 40);


  let wavform = fft.waveform(); // analyze the waveform
  beginShape();
  strokeWeight(3);
  stroke(200,20,180);
  noFill();
  for (let i = 0; i < wavform.length; i++) {
    let x = map(i, 0, wavform.length, 0, width);
    let y = map(wavform[i], -1, 1, height, 0);
    vertex(x, y);
    
  }
  endShape();


  // change oscillator frequency based on mouseX
  let fren = fre;
  osc.freq(fren);

  let amp = (0.2, 0.8, 0.7);
  osc.amp(amp);
}
