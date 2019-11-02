// initial values
let x, y, r, d, xc, yc;

let i = 0;
let grids = 26;
let scalFact;

function setup() {
	createCanvas(600, 600);
	background(0);
	
	scalFact = width / grids;
	r = 8 * scalFact;
	
	xc = 10 * scalFact;
	yc = 15 * scalFact;
	
	showGrids();
	showRefCircle();
	bresenham();
}

function showGrids() {
	stroke(255);
	for(i; i < grids * scalFact; i += scalFact) {
		line(i, 0, i, height);
		line(0, i, width, i);
	}
}

function showRefCircle() {
	stroke(200);
	noFill();
	circle(xc + (scalFact / 2), yc + (scalFact / 2), r * 2);
}

function bresenham() {
	x = 0;
	y = r;
	
	d = (3 * scalFact) - (2 * r);
	
	symPlot();
	while(x <= y) {  
		if(d <= 0) {  
			d = d + (4 * x) + (6 * scalFact);  
		}  
		else {  
			d = d + (4 * x) - (4 * y) + (10 * scalFact);  
			y -= scalFact;  
		}  

		x += scalFact;  
		symPlot();  
   }    
}

function symPlot() {
	fillPixel(x + xc, y + yc);
	fillPixel(x + xc, -y + yc);  
	fillPixel(-x + xc, -y + yc);  
	fillPixel(-x + xc, y + yc);  
	fillPixel(y + xc, x + yc);  
	fillPixel(y + xc, -x + yc);  
	fillPixel(-y + xc,-x + yc);  
	fillPixel(-y + xc, x + yc);  
}

function fillPixel(x, y) {
	noStroke();
	squareColor = color(255, 255, 255);
	squareColor.setAlpha(100);
	fill(squareColor);
	square(x, y, scalFact);
}