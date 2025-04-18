//global vars
let WIDTH = 500;
let HEIGHT = 600;
let paddleW = 100;
let paddleH = 20;
let px = 200;
let py = 580;
let r = 25;
let left = 68;
let right = 65;
let bally = 290;
let ballx = 250;
let xspeed;
let yspeed;
let mouse = false;
let UFO;
let imx;
let imy;
let im_size = 120; 
let score = 0;
let collision = false;
let appear;
let loseSound;
let boing;
let hit;
let left_paddle;
let right_paddle;
let space;
let p1 = -1000;
let p2 = 0;
let bounce = 0;
let shade =0;


function preload(){


	//images
	UFO = loadImage("images/ufo1.png");
	//asteroid = loadImage("images/asteroid.png");

	space = loadImage("images/background.png")

	//sounds
	boing = loadSound("sounds/bounce.mp3");
	hit = loadSound("sounds/hit.mp3");
	loseSound = loadSound("sounds/lost.mp3");
	

}

function setup(){
	createCanvas(WIDTH,HEIGHT);


	//setting speed to a random speed at start
	xspeed = random(2,4);
	yspeed = random(2,4);

	imx = random(120, 365);
	imy = random(70, 300);

	imageMode(CENTER);

	appear = false;
	bounce = 0;

}


function draw(){

	background(0);

	//start background
	imageMode(CORNER);

	
	
	image(space,0,p1);
	image(space,0,p2);

	p1 += 2;
	p2 += 2;

	if(p1 >= 1000){
		p1 = p2 - 1000;
	}

	if(p2 >= 1000){
		p2 = p1 - 1000;
	}

	imageMode(CENTER);


	



	paddle();

	//creating ball

	colorMode(HSB);
	fill(shade,255,255);
	ellipse(ballx,bally,r,r);

	//borders
	fill(shade,255,255);
	noStroke();
	rect(0,0,500,20);
	rect(0,0,20,600);
	rect(480,20,20,600);

	shade = shade + 1;
	if(shade > 255){
		shade = 0;
	}

	colorMode(RGB);

	//display score
	fill(0);
	text("Score: "+score, 30,15);

	fill(0);
	text("Bounces: "+bounce, 100,15);

	if(mouse&& game_over!=true){
		ball();


		image(UFO, imx,imy,im_size,im_size);


	}

				//checking if user is pressing left or right key
		if(keyIsDown(left)){
			px+=5;

		}

		if(keyIsDown(right)){
			px-=5;

		}

		//making sure paddle does not go beyond the border limit
		if(px<=20){
			px = 20;
		}

		if(px>=380){
			px=380;
		}

	

	if(check_collision()){

		hit.play();

		imx = random(120, 365);
		imy = random(70, 200);
		score++;




	}

	

	

}


function paddle(){

	//paddle
	stroke(shade,255,255);
	strokeWeight(2);
	fill(255);
	rect(px,py,paddleW,paddleH);




}


function ball(){

	//bouncing ball
	ballx += xspeed;
	bally+= yspeed;


	if(bally > py - paddleH - 4 && ballx > px && ballx < px + paddleW){//if hits paddle 
		
		if(ballx < px + 44 && ballx > px){

			xspeed = map(xspeed, 2,4,-1,-2);
			
			yspeed = -yspeed;
			boing.play();
		}

		else if(ballx < px + paddleW && ballx > px + 60){
			
			yspeed = -yspeed; 
			xspeed = map(xspeed, 2,4,5,6);
		

			boing.play();
		}

		else{
				yspeed = -yspeed; 
				boing.play();

		}
		
		bally= py-30;
	
		bounce++;



	}

	if(bally < 40){//if ball hits ceiling 
		boing.play();
		yspeed = -yspeed;
		bounce++;
		
}

	

	if (ballx > width - 40 || ballx < 40){//if hits left/right walls
		boing.play();
		xspeed = -xspeed;
		bounce++;
		
		}

	if (bally > height){//if goes out of bounds
		game_over();
		mouse = false;
		}


}


function check_collision(){//check if ball hit target


	let d = dist(imx,imy,ballx,bally);
	


  	if(d<80){
  		return true;
  	}
  	

}


function game_over(){
	//if ball misses paddle, start over
	
	ballx = 250;
	bally =	250;
	px = 200;
	py = 580;
	xspeed = random(2,4);
	yspeed = random(2,4);
	bounce = 0;

	//make ufo disappear 
	appear = false;
	score = 0;
	loseSound.play();


}


function mouseClicked(){
	mouse = true;

}


























