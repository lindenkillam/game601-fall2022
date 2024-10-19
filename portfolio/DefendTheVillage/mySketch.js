//By Linden Killam
//Some credit to https://www.freepnglogos.com/pics/explosion

const numAnts = 32;
var backgroundImage, music, laser, asplode;
var firingLine, firingLineFront;
var score, deadVillagers
let deathTimer = 1024;
let leftPressed = false, rightPressed = false, upPressed = false, downPressed = false;

class Ant {
	constructor() {
		this.thoraxRad = random(minThoraxRad, maxThoraxRad);
		this.midRad = this.thoraxRad*2/3;
		this.x = random(this.thoraxRad, width-this.thoraxRad);
		this.backX = this.x;
		this.frontX = this.x;
		this.y = random(-this.thoraxRad, 0);
		this.speed = random(height/4096, height/1024); //Adjust min and max speeds depending on screen height
		this.leftSide = this.x - this.midRad + this.midRad/2.7;
		this.rightSide = this.x + this.midRad - this.midRad/2.7;
		this.backSide = this.y - this.midRad;
		this.frontSide = this.y + this.midRad;
		this.legOffset = this.thoraxRad/3;
		this.legFrame = random(-this.legOffset, this.legOffset);
		this.legMovement = this.speed;
		this.eyeOffset = this.midRad/3;
		this.mandibleY = this.frontSide+this.eyeOffset*1.5;
		this.mandibleOffset = this.eyeOffset/2;
		this.mandibleFrame = random(0, this.mandibleOffset);
		this.mandibleMovement = this.thoraxRad/maxThoraxRad/3.0;
		this.timeOfDeath = -1;
	}
	
	drawAnt(i) {
		fill(80, 20, 20);
		strokeWeight(3);
		
		if(this.timeOfDeath < 0) { //Ant is alive
			this.updateAnt();
			if(this.frontSide >= height) { //Ant has reached the bottom of the screen
				ants.splice(i,1);
				ants.push(new Ant());
				++deadVillagers;
				return;
			}
		}
		else if(this.timeOfDeath < frameCount - deathTimer) { //Ant has been dead for a while;
			//respawn rate intensifies over time
			ants.splice(i, 1);
			ants.push(new Ant());
			return;
		}
		
		//Left side legs
		line(this.leftSide, this.backSide, this.leftSide-this.midRad, this.backSide+this.legFrame);
		line(this.leftSide-this.midRad, this.backSide+this.legFrame, this.leftSide-this.thoraxRad, this.backSide+this.legFrame+this.legOffset);
		line(this.leftSide, this.y, this.leftSide-this.midRad, this.y+this.legFrame);
		line(this.leftSide-this.midRad, this.y+this.legFrame, this.leftSide-this.thoraxRad, this.y+this.legFrame+this.legOffset);
		line(this.leftSide, this.frontSide, this.leftSide-this.midRad, this.frontSide+this.legFrame);
		line(this.leftSide-this.midRad, this.frontSide+this.legFrame, this.leftSide-this.thoraxRad, this.frontSide+this.legFrame+this.legOffset);
		
		//Right side legs
		line(this.rightSide, this.backSide, this.rightSide+this.midRad, this.backSide+this.legFrame); 
		line(this.rightSide+this.midRad, this.backSide+this.legFrame, this.rightSide+this.thoraxRad, this.backSide+this.legFrame+this.legOffset);
		line(this.rightSide, this.y, this.rightSide+this.midRad, this.y+this.legFrame); 
		line(this.rightSide+this.midRad, this.y+this.legFrame, this.rightSide+this.thoraxRad, this.y+this.legFrame+this.legOffset);
		line(this.rightSide, this.frontSide, this.rightSide+this.midRad, this.frontSide+this.legFrame); 
		line(this.rightSide+this.midRad, this.frontSide+this.legFrame, this.rightSide+this.thoraxRad, this.frontSide+this.legFrame+this.legOffset);
		
		//Mandibles
		arc(this.x+this.mandibleFrame, this.mandibleY, this.midRad, this.midRad, 0, HALF_PI, PIE);
		arc(this.x-this.mandibleFrame, this.mandibleY, this.midRad, this.midRad, HALF_PI, PI, PIE);
		
		//Body
		circle(this.backX, this.backSide, this.thoraxRad);
		circle(this.x, this.y, this.midRad);
		circle(this.frontX, this.frontSide, this.midRad);
		
		//Eyes
		fill(255,0,0);
		strokeWeight(0);
		circle(this.x-this.eyeOffset, this.frontSide+this.eyeOffset, this.eyeOffset);
		circle(this.x+this.eyeOffset, this.frontSide+this.eyeOffset, this.eyeOffset);
	}
	
	updateAnt() {
		
		if(this.legFrame > this.legOffset || this.legFrame < -this.legOffset)
			this.legMovement = -this.legMovement;
		
		if(this.mandibleFrame > this.mandibleOffset || this.mandibleFrame < 0)
			this.mandibleMovement = -this.mandibleMovement;
		
		this.legFrame += this.legMovement;
		this.mandibleFrame += this.mandibleMovement;
		
		this.y += this.speed;
		this.backSide = this.y - this.midRad;
		this.frontSide = this.y + this.midRad;
		this.mandibleY = this.frontSide+this.eyeOffset*1.5;
	}
	
	antDies() {
		++score;
		let getRekt = this.eyeOffset * 2;
		this.x += random(-getRekt, getRekt);
		this.backX += random(-getRekt, getRekt);
		this.frontX += random(-getRekt, getRekt);
		this.speed = 0;
		this.leftSide += random(-this.mandibleOffset, this.mandibleOffset);
		this.rightSide += random(-this.mandibleOffset, this.mandibleOffset);
		this.backSide += random(-this.eyeOffset, this.eyeOffset);
		this.frontSide += random(-this.eyeOffset, this.eyeOffset);
		this.legOffset += random(-this.eyeOffset, this.eyeOffset);
		this.legMovement = 0;
		this.eyeOffset += random(-this.mandibleOffset, this.eyeOffset);
		this.mandibleY += random(-this.mandibleOffset, this.mandibleOffset);
		this.timeOfDeath = frameCount;
	}
}//End of Ant class

class Player {
	constructor() {
		this.x = width/2;
		this.y = height*11/12;
		this.playerWidth = width/16.0;
		this.playerHeight = height/16.0
		this.playerHalfWidth = this.playerWidth/2.0;
		this.playerHalfHeight = this.playerHeight/2.0;
		this.movementX = width/256.0;
		this.movementY = height/256.0;
	}
	
	drawPlayer() {
		fill(255,0,0);
		rect(this.x-this.playerHalfWidth, this.y-this.playerHalfHeight, this.playerWidth, this.playerHeight);
	}
}//End of Player class

class Laser {
	constructor(player) {
		this.x = player.x-player.playerHalfWidth/2;
		this.y = player.y-player.playerHeight-player.playerHalfHeight;
		this.lWidth = player.playerHalfWidth;
		this.lHeight = player.playerHeight;
		this.lRight = this.x + this.lWidth;
		this.speed = player.movementY;
		if(upPressed)
			this.speed *= 2;
		else if(downPressed)
			this.speed /= 2;
	}
	
	drawLaser(i) {
		fill(255, 255, 0);
		strokeWeight(1);
		
		rect(this.x, this.y, this.lWidth, this.lHeight);
		
		this.y -= this.speed;
		if(this.y < -maxThoraxRad) {
			lasers.splice(i, 1);
		}
	}
}//End of Laser class

class Explosion {
	constructor(antX, antY) {
		this.x = antX;
		this.y = antY;
		this.alpha = 255;
		this.explosionType = int(random(1,4));
	}
}//End of Explosion class

function fire() {
	laser.play();
	lasers.push(new Laser(player));
}//End of fire function

keyPressed = function() {
  if (keyCode == LEFT_ARROW) leftPressed = true;
  if (keyCode == RIGHT_ARROW) rightPressed = true;
  if (keyCode == UP_ARROW) upPressed = true; 
  if (keyCode == DOWN_ARROW) downPressed = true;
	if (key == ' ') fire();
}//End of keyPressed function

keyReleased = function() {
  if (key == 'r'){
    resetGame();
  }
  if (keyCode == LEFT_ARROW) leftPressed = false;
  if (keyCode == RIGHT_ARROW) rightPressed = false;
  if (keyCode == UP_ARROW) upPressed = false; 
  if (keyCode == DOWN_ARROW) downPressed = false;
}//End of keyReleased function

function resetGame() {
	ants = [];
	lasers = [];
	explosions = [];
	for(let i = 0; i < numAnts; ++i) {
		ants.push(new Ant());
	}
	player = new Player();
	firingLine = firingLineFront + player.playerHalfHeight;
	score = 0;
	deadVillagers = 0;
	music.loop();
}//End of resetGame function

function preload() { //Set the right files for things
	backgroundImage = loadImage("Valley.png");
	//Remember to enable the "p5.sound" parameter in the "SKETCH" tab of the project so sound will work.
	music = loadSound("Level2.mp3");
	laser = loadSound("Laser.mp3");
	asplode = loadSound("Asplode.mp3");
	explosion1 = loadImage("Explosion1.png");
	explosion2 = loadImage("Explosion2.png");
	explosion3 = loadImage("Explosion3.png");
}//End of preload function

function setup() { //Runs before the first frame
	createCanvas(windowWidth, windowHeight);
	backgroundImage.resize(width, 0);
	firingLineFront = height*3/4;
	minThoraxRad = width/180.0;
	maxThoraxRad = width/50.0;
	laser.setVolume(0.1);
	asplode.setVolume(0.4);
	textSize(55);
	explosion1.resize(maxThoraxRad, 0);
	explosion2.resize(maxThoraxRad, 0);
	explosion3.resize(maxThoraxRad, 0);
	
	resetGame();
}//End of setup function

function draw() { //This runs all the time, like "update" in Unity code
	noTint();
	image(backgroundImage, 0, 0);
	
	if(frameCount % 8 === 0) //Respawn rate instensifies
	{
		--deathTimer;
		if(deathTimer < 0)
			deathTimer = 1024;
	}
	
	for(let i = 0; i < ants.length; ++i) {		
		
		if(ants[i].timeOfDeath < 0) { //Check to make sure the ant is alive, so timeOfDeath is -1
			for(let j = 0; j < lasers.length; ++j) { //Check lasers against live ants for collisions
				if(lasers[j].y <= ants[i].frontSide && lasers[j].x < ants[i].rightSide
						&& lasers[j].lRight > ants[i].leftSide) {
					lasers.splice(j, 1);
					asplode.play();
					explosions.push(new Explosion(ants[i].x-ants[i].midRad, ants[i].y-ants[i].midRad));
					ants[i].antDies();
				}
			}
		}
		
			ants[i].drawAnt(i);
		} //End of ants for loop
	
	for(let i = 0; i < lasers.length; ++i) {
		lasers[i].drawLaser(i);
	}
	
	strokeWeight(3);
	fill(255, 150);
	rect(0,firingLineFront, width, height-firingLineFront);
	
	if (leftPressed)
  	player.x -= player.movementX;
  else if (rightPressed)
    player.x += player.movementX;
	
	if (upPressed) {
		player.y -= player.movementY;
		if(player.y < firingLine)
			player.y = firingLine;
	}
  else if (downPressed)
		player.y += player.movementY;
	
	player.drawPlayer();
	
	for(let i = 0; i < explosions.length; ++i) {
		tint(255, explosions[i].alpha);
		switch(explosions[i].explosionType) {
			case 1:
				image(explosion1, explosions[i].x, explosions[i].y);
				break;
			case 2:
				image(explosion2, explosions[i].x, explosions[i].y);
				break;
			default:
				image(explosion3, explosions[i].x, explosions[i].y);
				break;
		}
	
		--explosions[i].alpha;
		if(explosions[i].alpha <= 0)
			explosions.splice(i,1);
	}
	
	text("Score: " + score, 0, 50);
	text("Dead Villagers: " + deadVillagers, width - 500, 50);
}//End of draw function