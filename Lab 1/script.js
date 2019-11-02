// initial values
let x1 = 1;
let y1 = 1;
let x2 = 5;
let y2 = 10;

let x, y, p, m, dx, dy;

let i = 0;
let grids = 15;
let scalFact;

function setup() {
	createCanvas(500, 500);
	background(0);
	
	let temp;
	
	scalFact = width / grids;
	x1 *= scalFact;
	y1 *= scalFact;
	x2 *= scalFact;
	y2 *= scalFact;
	
	if(x1 > x2) {
		temp = x1;
		x1 = x2;
		x2 = temp; 
	}
	if(y1 > y2) {
		temp = y1;
		y1 = y2;
		y2 = temp; 
	}
	
	x = x1;
	y = y1;
	
	dx = (x2 - x1) * scalFact;
	dy = (y2 - y1) * scalFact;
	
	if(dx > dy) {
		m = 0;
		p = (2 * dy) - dx;
	}
	else if(dx < dy) {
		m = 2;
		p = (2 * dx) - dy;
	}
	else {
		m = 1;
	}
	
	showGrids();
	showRefLine();
	bresenham(x, y);
	
}

function showGrids() {
	stroke(255);
	for(i; i < grids * scalFact; i += scalFact) {
		line(i, 0, i, height);
		line(0, i, width, i);
	}
}

function showRefLine() {
	stroke(200);
	line(x1, y1, x2, y2);
}

function bresenham(x, y) {
	if(m <= 1) {
		while(x < x2) {
			fillPixel(x, y);
			x += scalFact;
			if(p < 0) {
				p = p + (2 * dy);
			}
			else {
				p = p + (2 * dy) - (2 * dx);
				y += scalFact;
			}
		}
	}
	else {
		while(y < y2) {
			fillPixel(x, y);
			y += scalFact;
			if(p < 0) {
				p = p + (2 * dx);
			}
			else {
				p = p + (2 * dx) - (2 * dy);
				x += scalFact;
			}
		}
	}
}

function fillPixel(x, y) {
	noStroke();
	squareColor = color(255, 255, 255);
	squareColor.setAlpha(120);
	fill(squareColor);
	square(x, y, scalFact);
}