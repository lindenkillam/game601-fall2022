let stars = [];
let frames = 0;
const numStars = 200;
const lowerColorBound = 128;
const velocityBound = 10;
const diamLower = 10, diamUpper = 30;

function createStar() {
	let star = {};
	star.xDiam = random(diamLower, diamUpper);
	star.yDiam = random(diamLower, diamUpper);
	star.posX = random(star.xDiam, width - star.xDiam);
	star.posY = random(star.yDiam, height - star.yDiam);
	star.velX = random(-velocityBound, velocityBound);
	star.velY = random(-velocityBound, velocityBound);
	star.red = random(lowerColorBound, 255);
	star.green = random(lowerColorBound, 255);
	star.blue = random(lowerColorBound, 255);
	return star;
}

function drawStar(star) {
		fill(star.red, star.green, star.blue);
		ellipse(star.posX, star.posY, star.xDiam, star.yDiam);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	noStroke();

	for (var i = 0; i < numStars; ++i) {
		stars[i] = createStar();
		drawStar(stars[i]);
	}
}

function draw() {
	
	background(0);
	++frames;

	for (var i = 0; i < numStars; ++i) {
		//Change star positions and set coloration:
		stars[i].posX += stars[i].velX;
		stars[i].posY += stars[i].velY;

		//Check for edge collisions:
		if (stars[i].posX - stars[i].xDiam < 0) {
			stars[i].posX = stars[i].xDiam;
			stars[i].velX = -stars[i].velX;
		} else if (stars[i].posX + stars[i].xDiam > width) {
			stars[i].posX = width - stars[i].xDiam;
			stars[i].velX = -stars[i].velX;
		}

		if (stars[i].posY - stars[i].yDiam < 0) {
			stars[i].posY = stars[i].yDiam;
			stars[i].velY = -stars[i].velY;
		} else if (stars[i].posY + stars[i].yDiam > height) {
			stars[i].posY = height - stars[i].yDiam;
			stars[i].velY = -stars[i].velY;
		}

		//Draw stars
		drawStar(stars[i]);

		//Switch it up every X frames
		if (frames % 15 === 0) {
			stars[i].xDiam = random(diamLower, diamUpper);
			stars[i].yDiam = random(diamLower, diamUpper);
			stars[i].velX = random(-velocityBound, velocityBound);
			stars[i].velY = random(-velocityBound, velocityBound);
			stars[i].red = random(lowerColorBound, 255);
			stars[i].green = random(lowerColorBound, 255);
			stars[i].blue = random(lowerColorBound, 255);
		}
	}
}

/*
class Star {
	constructor() {
		this.diam = random(4, 20);
		this.posX = random(this.diam, width - this.diam);
		this.posY = random(this.diam, height - this.diam);
		this.velX = random(-velocityBound, velocityBound);
		this.velY = random(-velocityBound, velocityBound);
		this.red = random(lowerColorBound, 255);
		this.green = random(lowerColorBound, 255);
		this.blue = random(lowerColorBound, 255);
	}
	*/