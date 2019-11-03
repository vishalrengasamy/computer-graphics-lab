let scaleSlider, xTranslateSlider, yTranslateSlider, rotateSlider, transButton, resetButton;
let scal = 0,
  yTrans = 0,
  xTrans = 0,
  rot = 0;
let polySize = 4;
let x1 = 0,
  y1 = 0,
  x2 = 80,
  y2 = 0,
  x3 = 80,
  y3 = 80,
  x4 = 0,
  y4 = 80;
let vert = [];
let vertCopy = [];


function setup() {
  createCanvas(600, 600);

  scaleSlider = createSlider(1.0, 5.0, 1.0);
  scaleSlider.position(20, height - (scaleSlider.height * 1.5));

  yTranslateSlider = createSlider(0, height, 0);
  yTranslateSlider.position(20, height - (yTranslateSlider.height * 3));

  xTranslateSlider = createSlider(0, width, 0);
  xTranslateSlider.position(20, height - (xTranslateSlider.height * 4.5));

  rotateSlider = createSlider(0, 2 * PI, 0);
  rotateSlider.position(20, height - (rotateSlider.height * 6));

  transButton = createButton('Transform!');
  transButton.position(width - 160, height - 40);
  
  resetButton = createButton('Reset');
  resetButton.position(width - 70, height - 40);

  vert = [
    [x1, y1, 1],
    [x2, y2, 1],
    [x3, y3, 1],
    [x4, y4, 1]
  ];
  
  for(let i = 0; i < polySize; i++) {
    vertCopy[i] = [];
    vertCopy[i][0] = vert[i][0];
    vertCopy[i][1] = vert[i][1];
    vertCopy[i][2] = vert[i][2];
  }
  
}

function draw() {
  background(20, 81, 181);
  noStroke();
  fill(255);
  
  scal = scaleSlider.value();
  yTrans = yTranslateSlider.value();
  xTrans = xTranslateSlider.value();
  rot = rotateSlider.value();
  
  strokeWeight(1);
  text('Scale:', scaleSlider.x * 2 + scaleSlider.width, height - scaleSlider.height);
  text(scal, 250, height - scaleSlider.height);

  text('Y Translate:', yTranslateSlider.x * 2 + yTranslateSlider.width, height - yTranslateSlider.height * 2.5);
  text(yTrans, 250, height - yTranslateSlider.height * 2.5);

  text('X Translate:', xTranslateSlider.x * 2 + xTranslateSlider.width, height - xTranslateSlider.height * 4);
  text(xTrans, 250, height - xTranslateSlider.height * 4);

  text('Rotate:', rotateSlider.x * 2 + rotateSlider.width, height - rotateSlider.height * 5.5);
  text(rot, 250, height - rotateSlider.height * 5.5);
  
  transButton.mousePressed(transform);
  resetButton.mousePressed(reset);
  drawPoly();
}

function transform() {
  let transMat = math.matrix([[1, 0, xTrans], [0, 1, yTrans], [0, 0, 1]]);
  let rotMat = math.matrix([[cos(rot), -sin(rot), 0], [sin(rot), cos(rot), 0], [0, 0, 1]]);
  let scalMat = math.matrix([[scal, 0, 0], [0, scal, 0], [0, 0, 1]]);
  
  let vertTranspose = math.transpose(vert);
  
  let interMat = math.multiply(scalMat, rotMat);
  interMat = math.multiply(transMat, interMat);
  
  let finalMat = math.multiply(interMat, vertTranspose);
  finalMat = math.transpose(finalMat)
  vert = finalMat._data;
}

function reset() {
  vert = vertCopy;
}  

function drawPoly() {
  stroke(255, 60, 60);
  strokeWeight(3);
  for (let i = 0; i < polySize; i++) {
    let k = (i + 1) % polySize;
    line(vert[i][0], vert[i][1], vert[k][0], vert[k][1]);
  }
}