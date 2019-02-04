//VARIABLES FOR THE PLAYER
var player;
var playerSize =20; //Standard size = 20
var playerSpd = 6; //Standard Speed = 6
var shootAllow = true;
//VARIABLES FOR HUD
var score;
var counterFrame = 0;
var level =0;
var difficulty = 1;
var rectangleObjects = [];
let playBtn;
let pauseBtn;
var play=true;
var surcharge = [];
var surchargedShot = -1;
var discharged=0;
var startDiscount = false;
//VARIABLE TO UTILISE IN GAME OBJECTS
var bullets = [];
var ennemies = [];
var ennemies_speed=[];
//VARIABLES FOR THE BACKGROUND USE
var start = false;
var basicVolume = 0.1;
var lvlupcalled = true;
var playerWasHit = false;
//VARIABLES FOR THE SMALL SCREEN
var smallW;
var smallH;
var smallX;
var smallY;

// SOUND OBJECT
var playList = {
	mySoundSFX : 'sound/main.ogg',
	lazerSFX :'sound/lazer.ogg',
	crashSFX :'sound/crash.ogg',
	lvlupSFX : 'sound/lvlup.ogg',
	overloadSFX : 'sound/overload.ogg'
};

// IMAGES OBJECT
var imgList = {
	playBtn : 'img/Button-Play-icon.png',
	pauseBtn : 'img/Button-Pause-icon.png'
};

var oneSec = 50; // FPS
//BUFFERS FOR DIFFERENT FILES sound, img
function preload(){
	// LOADING THE SOUNDS
	soundFormats('mp3', 'ogg');
	mySoundSFX = loadSound(playList.mySoundSFX); 
	lazerSFX =  loadSound(playList.lazerSFX); 
	crashSFX = loadSound(playList.crashSFX); 
	lvlupSFX = loadSound(playList.lvlupSFX); 
	overloadSFX = loadSound(playList.overloadSFX); 

	//LOADING THE IMAGES
	playBtn = loadImage(imgList.playBtn);
	pauseBtn = loadImage(imgList.pauseBtn);
}

//MAKES THE INITIAL SETUP
function setup(){
	frameRate(oneSec);	
	//THE MAIN CANVAS
	createCanvas(820,540);

	//THE SMALLER SCREEN
	smallW = 640;
	smallH = 480;
	smallX = (width-smallW+20)/2;
	smallY = (height-smallH)/2;
	//CREATION OF THE PLAYER	
	player = new player // X,Y, spd,LimitLeft,LimitRight,Size
	( 
		(smallW/2)+smallX ,
		smallH+30,
		playerSpd,
		smallX+playerSize,
		smallX+smallW-playerSize,
		playerSize 
	);
	//INITIALIZING THE SCORE
	score = 0;
	//INITIALIZING THE SOUNDS iN THE GAME
	mySoundSFX.setVolume(basicVolume);
	mySoundSFX.onended(soundDone);
	lazerSFX.setVolume(basicVolume);
	crashSFX.setVolume(basicVolume);
	lvlupSFX.setVolume(basicVolume);
	rectangleObjects['overload'] = {
		xd:35,
		yd:125,
		xf:65,
		yf:225
	};
	//CREATE THE TABLE NECESSARY TO CONTRUCT THE SURCHARGE BAR
	createSurchargeBar();	
	
}

// THE DRAWING FUNCTION A.K.A GAME ENGINE
function draw(){
	createScreens();
	if (start){
		//RENDER SCORE AND LEVEL ///////////////////////////////
		scoreAndLevel();
		//RENDER SOUND //////////////////////////////////////////
		soundRender();
		///////////////////////////////////////////////////
		//PLAY AND PAUSE THE GAME//////////////////////////////////////////
		playAndPause();
		//////////////////////////////////////////////
		// LEVEL UP /////////////////////////////////
		levelUP();
		//////////////////////////////////////////////
		//PLAYER RENDER/////////////////////////////
		playerRender();
		////////////////////////////////////////////
		//RENDER THE HP ///////////////////////////
		hpRender();
		///////////////////////////////////////////
		//CREATE AN ENNEMY ///////////////////////	
		createEnnemy();
		////////////////////////////////////////////
		// CREATE AND RENDER THE OVERCHARGE BAR /////////
		drawOverchargeBar();
		// ADD FUNCTION FOR OVERLOAD 
		whenIsOverload();
		if(surchargedShot >10) surchargedShot = 10;

		// AUTOMATICALY DISCHARGING IF THE PLAYER IS NOT OVERLOADED
		autoDischarge();
		if(surchargedShot<0) surchargedShot = 0;
		
		// RENDER THE LITTLE RED BLOCKS
		renderOverloadSquares();
		
		// /////////////////////////////////////////

		//RENDER THE ENNEMIES ///////////////////////
		renderEnnemies();
		/////////////////////////////////////////////
		//RENDER THE BULLETS////////////////////////
		renderBullets();
		/////////////////////////////////////////////
		//CHECKING FOR COLLISION BULLET ENNEMY //////
		checkCollision();
		/////////////////////////////////////////////
		//CHECKING IF THE ENNEMY WENT PAST THE PLAYER ///
		didEnnemyPastScreen();
		/////////////////////////////////////////////
		//DELETING BULLETS IF THEY GO OFF THE SCREEN////
		didBulletsPastScreen();
		/////////////////////////////////////////////
		// INCREMENTING THE COUNTER OF FRAMES
		counterFrame ++;
		/////////////////// END OF if(start) /////////////////////////
	}
	else {
		startScreen();
	}
	// EVENTS IF PLAYER GETS HIT /////////////////////
	isPlayerHit();
	/////////////////////////////////////////////
	// EVENT IF THE PLAYER HAS NO MORE LIFE POINTS /////////////////
	isPlayerDead();

}
/////////////////////// END OF DRAW //////////////////////

var isPlayerHit = function(){
	if(playerWasHit) {
		player.hp--;
		playerWasHit = false;
	}
}
	

// Checks if the player lost all its HP and starts an event 
var isPlayerDead= function(){
	if(player.hp == 0){
		alert ("GAME OVER. Score : "+score.toString() +" Level : "+(level+1).toString());
		location.reload();
	}
}

// DESTROYS BULLETS IF IT GETS OUT OF THE SCREEN
var didBulletsPastScreen = function(){
	for(var i=bullets.length-1 ; i>=0 ; i--){
		b = bullets[i];
		if (b.toDelete || b.y < 30 || b.x<smallX || b.x>smallW+smallX) 
		{ 
			bullets.splice(i,1); 
		}
	}
}

// DESTORYS ENNEMY IF IT PASSES OUT OF THE SCREEN
var didEnnemyPastScreen = function(){
	for(var e=0;e<ennemies.length;e++){
		s = ennemies[e];
		if(s.y-s.r>=smallH+smallY){
		playerWasHit = true;
			s.dead();
		}
		
		if (s.toDelete)  ennemies.splice(e,1);
	}	
}

// CHECK COLLISION BETWEEN BULLET AND ENNEMY
var checkCollision = function(){
	for(var i=0;i<bullets.length;i++){
		for(var e =0;e<ennemies.length;e++){
			if(bullets[i].hits(ennemies[e])){
				crashSFX.play();
				bullets[i].dead();
				ennemies[e].dead();
				score+=100;
			}
		}
	}
}
// RENDER OVERLOAD SQUARES
var renderOverloadSquares = function(){
	for (var i=0 ; i<surchargedShot;i++){
		var sur = surcharge[i];
		rect(sur[0],sur[1],sur[2],sur[3]);
	}
}
// THE AUTOMATICAL DISCHARGE FUNCTION
var autoDischarge = function(){
	if(counterFrame % oneSec==0 && discharged==0 && surchargedShot<10  && play) {
		shootAllow = true;
		surchargedShot--;
		startDiscount = true;
	}
}
/// WHAT TO DO IF PLAYER HITS OVERLOAD STATUS
var whenIsOverload = function(){
	if( counterFrame% oneSec == 0 && surchargedShot ==10 && startDiscount){ 
		discharged = 150;
		startDiscount = false;
		overloadSFX.setVolume(basicVolume);
		overloadSFX.play();	
	}
	if(discharged >0 && play) { 
		shootAllow = false;
		discharged--;
		if(discharged == 0) surchargedShot = 5;
	}
}

//Render bullets
var renderBullets = function(){
	for(var i=bullets.length-1;i>=0;i--){
		b = bullets[i];
		b.show();
		b.move();
	}
}

// Render the ennemies
var renderEnnemies = function(){
	for(var e=ennemies.length-1;e>=0;e--){
		s = ennemies[e];
		s.show();
		s.move();
	}
}

// draws the overcharge

var drawOverchargeBar = function(){
	fill('green');
	textSize(12);
	text('OVERLOAD',12,115);	
	fill('black');
	strokeWeight(2);
	stroke(51);
	rect(35,125,30,100);
	noFill();
	fill('red');
}
//Create Both screens //

var createScreens = function(){
	background(150);
	fill('black');
	drawRect("smallRectangle",smallX,smallY,smallW,smallH);
}

// CREATE THE ENNEMIES //

var createEnnemy = function(){
	//Basic ennemy
	if(counterFrame%100 == 0){
		var e = new ennemy(difficulty,'red');
		ennemies.push(e);
	}
}

// RENDER THE HP ///

var hpRender = function(){
	fill('black');
	drawRect("playerHP",10,60,75,25);
	textSize(20);
	fill('green');
	text('HP : '+player.hp.toString() ,10 ,80);
}

/// MAKE ACTIONS OF MOUVEMENT AND IMAGE OF PLAYER ///
var playerRender = function(){
	mouvement();
	player.show();
}

/// HOW TO KNOW WHEN TO LEVEL UP
//
var levelUP = function(){
	if(score%1000==0 && score !=0 ){
		levelup();
		level = score /1000;
		difficulty = level;
		if(lvlupcalled){
			lvlupSFX.play();
			lvlupcalled = false;
			player.hp++;
			if(player.hp == 99 ) player.hp = 99;
		}
	}else {lvlupcalled = true; }
}

///WHEN YOU PRESS PAUSE (p) WHAT HAPPENS ///////////////
var playAndPause = function(){
	if(!play){
		shootAllow = false;
		image(pauseBtn, 760,40);	
		player.speed = 0;
		for(var i=0;i<ennemies.length;i++){
			ennemies_speed.push(ennemies[i].spd);	
			ennemies[i].spd =0;
		}
	}
	else{
		shootAllow = true;
		image(playBtn, 760,40);	
		player.speed = playerSpd;
		if(ennemies_speed.length!=0){
			for(var i=0;i<ennemies.length;i++){
				ennemies[i].spd = ennemies_speed[i];
			}
			ennemies_speed=[];
		}
	}
}
		//////////////////////////////////////////////

//RENDER SOUND ///
var soundRender= function(){
	fill('black');
	drawRect("sound",715,10,95,15);
	fill('green');
	text('SOUND ON/OFF',720 ,20);
	noFill();
}

// RENDER SCORE AND LEVEL ///
var scoreAndLevel = function(){
	fill('black');
	drawRect("scores",5,5,90,30);
	textSize(10);
	textStyle(BOLD);
	fill('green');
	text('Score : '+score.toString(), 10, 15);
	text('Level : '+(level+1).toString(), 10, 30);
}
//
// THE WELCOME SCREEN ////////////////////////////////////////////
var startScreen = function(){
	fill('green');
	drawRect("start",(smallX+smallW)/2,(smallY+smallH)/2-40,100,50);
	textSize(20);
	fill('red');
	textStyle(BOLD);
	text("START",(smallX+smallW)/2+15,(smallY+smallH)/2-10);	
}
/////////////////////////////////////////////
	
// HELPS TO CHECK IF THE MOUSE CLICKED ON AN IMPORTANT OPTION /////
var isRectClicked = function(name){
	r = rectangleObjects[name];
	mx = mouseX;
	my = mouseY;
	return (mx> r.xd &&  mx < r.xf && my>r.yd && my<r.yf);
}

/////////////////////////////////////////////

//CHECKING IF THE MOUSE CLICKS ON IMPORTANT OPTION, start, sound etc////
function mouseClicked(){
	if(!start && isRectClicked('start') ) {
			start = true;
			mySoundSFX.play();
	}
	if(isRectClicked('sound')){
		if(basicVolume > 0 ){
			basicVolume = 0;
			mySoundSFX.setVolume(basicVolume);
		}else{
			basicVolume = 0.1;
			mySoundSFX.setVolume(basicVolume);
		}
	}
}
/////////////////////////////////////////////

// POPS UP THE LEVEL UP ////////////////////
var levelup = function(){
	textSize(50);0
	textStyle(BOLD);
	fill('green');
	text('LEVEL UP', width/2-120, height/2-50);
}
//////////////////////////////////////////////

// THE MOUVEMENT OF THE PLAYER //////////////
function mouvement(){
	if (keyIsDown(RIGHT_ARROW)){
		player.move(1);
	}if(keyIsDown(LEFT_ARROW)){
		player.move(-1);
	}
}

//////////////////////////////////////////////

// LISTENS TO ALL THE KEY PRESSED AND ACTIVATES DIFFERENT EVENTS ///////
function keyPressed(){
	if(key == ' ' && shootAllow ){
		surchargedShot++;
		lazerSFX.play();
		var b = new bullet(player.x,player.y-15,0,-5);
		bullets.push(b);
		/* if(level>=1){
			var b1 = new bullet(player.x,player.y-15,-1,-4);
			bullets.push(b1);
		}
		if(level>=2){
			var b2 = new bullet(player.x,player.y-15,1,-4);
			bullets.push(b2);
		}
		if(level>=3){
			var b3 = new bullet(player.x,player.y,-3,-4);
			bullets.push(b3);
		}
		if(level>=4){
			var b4 = new bullet(player.x,player.y,3,-4);
			bullets.push(b4);
		}*/
	}
	if(key =='p') {
		play= !play;
	}
	if(key =='m'){
		if(basicVolume > 0 ){
			basicVolume = 0;
			mySoundSFX.setVolume(basicVolume);
		}else{
			basicVolume = 0.1;
			mySoundSFX.setVolume(basicVolume);
		}
	}
}
//////////////////////////////////////////////

//FUNCTION NCESSARY TO INITIALISE A TABLE IN ORDER TO CONSTRUCT THE SURCHARGE
var createSurchargeBar = function(){
	if(surcharge.length  == 0){
		sur = rectangleObjects['overload'];
        	for(var i = sur.yd;i< sur.yf;i+=20){
        		var left = true;
        		for(var l=0;l<=1;l++){
        			var toPush=[];
        			if(left){
        				toPush.push(sur.xd);
        			}else{
        				toPush.push( (sur.xf-sur.xd)/2 + sur.xd);
        			}
        			left = !left;
        			toPush.push(i);
        			toPush.push(15);
        			toPush.push(20);
        			surcharge.push(toPush);
        		}
        	}
        }
	surcharge.reverse();
}

//IF THE MAIN THEME SOUND IS OVER, RESTART IT
var soundDone = function(){
	mySoundSFX.playMode('restart');
  	mySoundSFX.setVolume(basicVolume);
	mySoundSFX.play();
	
}
//////////////////////////////////////////////

// ALLOWS TO EASLY DRAW A RECTANGLE AND ADD ITS PRORIETIES TO A LIT
// IN ORDER TO MAKE CLICKABLE EVENTS ON THEM
var drawRect = function(id,x,y,width,height){
	rectangle = {
		xd : x,
		yd : y,
		xf : x+width,
		yf : y+height,
	}
	strokeWeight(2);
        stroke(51);
	rect(x,y,width,height);
	noStroke();
	rectangleObjects[id] =  rectangle;
}
//////////////////////////////////////////////

